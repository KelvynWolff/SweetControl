import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';

@Controller('cidades')
export class CidadesController {
  constructor(private readonly cidadesService: CidadesService) {}

  @Post()
  create(@Body() createCidadeDto: CreateCidadeDto) {
    return this.cidadesService.create(createCidadeDto);
  }

  @Get()
  findAll() {
    return this.cidadesService.findAll();
  }

  @Get(':codigobge')
  findOne(@Param('codigobge', ParseIntPipe) codigobge: number) {
    return this.cidadesService.findOne(codigobge);
  }

  @Patch(':codigobge')
  update(@Param('codigobge', ParseIntPipe) codigobge: number, @Body() updateCidadeDto: UpdateCidadeDto) {
    return this.cidadesService.update(codigobge, updateCidadeDto);
  }

  @Delete(':codigobge')
  remove(@Param('codigobge', ParseIntPipe) codigobge: number) {
    return this.cidadesService.remove(codigobge);
  }
}