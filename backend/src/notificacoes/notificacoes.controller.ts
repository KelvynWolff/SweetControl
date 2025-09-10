import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';

@Controller('notificacoes')
export class NotificacoesController {
  constructor(private readonly notificacoesService: NotificacoesService) {}

  @Post()
  create(@Body() createNotificacaoDto: CreateNotificacaoDto) {
    return this.notificacoesService.create(createNotificacaoDto);
  }

  @Get()
  findAll() {
    return this.notificacoesService.findAll();
  }

  @Patch(':id/leitura')
  markAsRead(@Param('id', ParseIntPipe) id: number, @Body() updateNotificacaoDto: UpdateNotificacaoDto) {
    return this.notificacoesService.markAsRead(id, updateNotificacaoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notificacoesService.remove(id);
  }
}