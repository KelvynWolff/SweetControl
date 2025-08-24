import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PromocoesService } from './promocoes.service';
import { CreatePromocaoDto } from './dto/create-promocao.dto';
import { UpdatePromocaoDto } from './dto/update-promocao.dto';

@Controller('promocoes')
export class PromocoesController {
  constructor(private readonly promocoesService: PromocoesService) {}

  @Post()
  create(@Body() createPromocaoDto: CreatePromocaoDto) {
    return this.promocoesService.create(createPromocaoDto);
  }

  @Get()
  findAll() {
    return this.promocoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.promocoesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePromocaoDto: UpdatePromocaoDto) {
    return this.promocoesService.update(id, updatePromocaoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.promocoesService.remove(id);
  }
}