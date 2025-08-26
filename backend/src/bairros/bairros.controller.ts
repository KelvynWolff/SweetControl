import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BairrosService } from './bairros.service';
import { CreateBairroDto } from './dto/create-bairro.dto';
import { UpdateBairroDto } from './dto/update-bairro.dto';

@Controller('bairros')
export class BairrosController {
  constructor(private readonly bairrosService: BairrosService) {}

  @Post()
  create(@Body() createBairroDto: CreateBairroDto) {
    return this.bairrosService.create(createBairroDto);
  }

  @Get()
  findAll() {
    return this.bairrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bairrosService.findOne(id);
  }

  @Get('por-cidade/:cidadeId')
  findAllByCidade(@Param('cidadeId', ParseIntPipe) cidadeId: number) {
    return this.bairrosService.findAllByCidade(cidadeId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBairroDto: UpdateBairroDto) {
    return this.bairrosService.update(id, updateBairroDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bairrosService.remove(id);
  }
}