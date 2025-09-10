import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { EmailsService } from '../emails/emails.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { NotificacoesService } from 'src/notificacoes/notificacoes.service';

@Controller('pedidos')
export class PedidosController {
  constructor(
    private readonly pedidosService: PedidosService,
    private readonly notificacoesService: NotificacoesService,
  ) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() updatePedidoDto: UpdatePedidoDto) {
    if (!updatePedidoDto.status) {
      throw new BadRequestException('O campo status é obrigatório para esta operação.');
    }
    return this.pedidosService.updateStatus(id, updatePedidoDto.status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.remove(id);
  }

  @Post(':id/enviar-email')
  async enviarEmailConfirmacao(@Param('id', ParseIntPipe) id: number) {
      const pedido = await this.pedidosService.findOne(id);
      await this.notificacoesService.criarEEnviarNotificacaoDePedido(pedido);
      return { message: 'Notificação salva no histórico e email de confirmação enviado!' };
  }
}