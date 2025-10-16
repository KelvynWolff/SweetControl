import { Controller, Get, Post, Body, Param, ParseIntPipe, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { NotasComprasService } from './notas-compras.service';
import { CreateNotaCompraDto } from './dto/create-nota-compra.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notasComprasService.findOne(id);
  }

  @Post('upload-xml')
  @UseInterceptors(FileInterceptor('file'))
  async processXml(@UploadedFile() file: Express.Multer.File) {
    return this.notasComprasService.processXml(file.buffer);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notasComprasService.remove(id);
  }
}