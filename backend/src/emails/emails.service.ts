import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { Pedido } from '../pedidos/entities/pedido.entity';
import * as nodemailer from 'nodemailer';

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
      secure: false,
      auth: {
        user: 'jerrold.upton@ethereal.email',
        pass: 'kMKTDjVkmHF7ceXAQW',
      },
    });
  }

  create(createEmailDto: CreateEmailDto): Promise<Email> {
    const email = this.emailRepository.create(createEmailDto);
    return this.emailRepository.save(email);
  }

  findAll(): Promise<Email[]> {
    return this.emailRepository.find({ relations: ['pessoa'] });
  }

  async findOne(id: number): Promise<Email> {
    const email = await this.emailRepository.findOne({ where: { id }, relations: ['pessoa'] });
    if (!email) { throw new NotFoundException(`Email com o ID #${id} não encontrado.`); }
    return email;
  }

  async update(id: number, updateEmailDto: UpdateEmailDto): Promise<Email> {
    const email = await this.emailRepository.preload({ id, ...updateEmailDto });
    if (!email) { throw new NotFoundException(`Email com o ID #${id} não encontrado.`); }
    return this.emailRepository.save(email);
  }

  async remove(id: number): Promise<void> {
    const email = await this.findOne(id);
    await this.emailRepository.remove(email);
  }
  
  async enviarEmailPedido(pedido: Pedido, emailCliente: string) {
    console.log(`--- [EmailsService] Preparando para enviar email para ${emailCliente}... ---`);

    const htmlContent = `
      <h1>Olá, ${pedido.cliente.pessoa.nome}!</h1>
      <p>Seu pedido #${pedido.id} foi recebido com sucesso.</p>
      <p>Status: ${pedido.status}</p>
      <ul>
        ${pedido.itens.map(item => `<li>${item.produto.nome} (x${item.quantidade})</li>`).join('')}
      </ul>
      <p>Total: R$ ${pedido.pagamento.valor.toFixed(2)}</p>
    `;

    const info = await this.transporter.sendMail({
      to: emailCliente,
      from: '"Sweet Control" <noreply@sweetcontrol.com>',
      subject: `Confirmação do Pedido #${pedido.id}`,
      html: htmlContent,
    });

    console.log('--- [EmailsService] Email enviado com sucesso! ---');
    console.log('URL de Visualização (Ethereal):', nodemailer.getTestMessageUrl(info));
  }
}