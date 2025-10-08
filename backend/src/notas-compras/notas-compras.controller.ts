import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotasComprasService } from './notas-compras.service';
import { CreateNotaCompraDto } from './dto/create-nota-compra.dto';

@Controller('notas-compras')
export class NotasComprasController {
  constructor(private readonly notasComprasService: NotasComprasService) {}

  @Post()
  create(@Body() createNotaCompraDto: CreateNotaCompraDto) {
    return this.notasComprasService.create(createNotaCompraDto);
  }

  @Get()
  findAll() {
    return this.notasComprasService.findAll();
  }
}