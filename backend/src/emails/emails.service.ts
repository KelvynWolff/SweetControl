import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import * as nodemailer from 'nodemailer';
import { Pedido } from '../pedidos/entities/pedido.entity';

@Injectable()
export class EmailsService {
  private transporter;

  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {
    this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'user_ethereal',
            pass: 'pass_ethereal'
        }
    });
  }


  create(createEmailDto: CreateEmailDto): Promise<Email> {
    const email = this.emailRepository.create(createEmailDto);
    return this.emailRepository.save(email);
  }

  findAll(): Promise<Email[]> {
    return this.emailRepository.find();
  }

  async findOne(id: number): Promise<Email> {
    const email = await this.emailRepository.findOneBy({ id });
    if (!email) {
        throw new NotFoundException(`Email com ID #${id} não encontrado.`);
    }
    return email;
  }

  async update(id: number, updateEmailDto: UpdateEmailDto): Promise<Email> {
    const email = await this.emailRepository.preload({
        id,
        ...updateEmailDto,
    });
    if (!email) {
        throw new NotFoundException(`Email com ID #${id} não encontrado.`);
    }
    return this.emailRepository.save(email);
  }

  async remove(id: number): Promise<void> {
    const result = await this.emailRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Email com ID #${id} não encontrado.`);
    }
  }


  async enviarEmailPedido(pedido: Pedido) {
    const emailDestino = pedido.cliente?.pessoa?.emails?.[0]?.email;
    
    if (!emailDestino) {
        console.warn(`Cliente do pedido #${pedido.id} não possui e-mail cadastrado.`);
        return { message: 'Cliente sem e-mail cadastrado.' };
    }

    const totalItens = pedido.itens ? pedido.itens.reduce((acc, item) => acc + (Number(item.preco) * item.quantidade), 0) : 0;
    const totalPago = pedido.pagamentos ? pedido.pagamentos.reduce((acc, p) => acc + Number(p.valor), 0) : 0;

    const htmlContent = `
      <h1>Olá, ${pedido.cliente.pessoa.nome}!</h1>
      <p>Seu pedido #${pedido.id} foi recebido com sucesso.</p>
      <p><strong>Status:</strong> ${pedido.status}</p>
      
      <h3>Resumo do Pedido:</h3>
      <ul>
        ${pedido.itens.map(item => `<li>${item.produto.nome} - ${item.quantidade}x - R$ ${Number(item.preco).toFixed(2)}</li>`).join('')}
      </ul>
      
      <p><strong>Valor Total do Pedido:</strong> R$ ${totalItens.toFixed(2)}</p>
      <p><strong>Total Pago:</strong> R$ ${totalPago.toFixed(2)}</p>
      
      <p>Obrigado pela preferência!</p>
    `;

    try {
        await this.transporter.sendMail({
            from: '"Sweet Control" <noreply@sweetcontrol.com>',
            to: emailDestino,
            subject: `Confirmação do Pedido #${pedido.id}`,
            html: htmlContent,
        });
        return { message: 'Email enviado com sucesso!' };
    } catch (error) {
        console.error("Erro ao enviar email:", error);
        return { message: 'Erro ao tentar enviar o email.', error: error.message };
    }
  }
}