import { PartialType } from '@nestjs/mapped-types';
import { CreateTelefoneDto } from './create-telefone.dto';

export class UpdateTelefoneDto extends PartialType(CreateTelefoneDto) {}