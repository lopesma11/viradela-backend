import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ClientSource } from '../entities/client.entity';

/**
 * DTO para dados de uma criança
 *
 * Por quê classe separada?
 * - ValidateNested funciona com classes
 * - Type-safety
 * - Documentação Swagger
 */
class ChildDto {
  @ApiProperty({ example: 'Ana Silva' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: '2020-03-15' })
  @IsDateString()
  birthday: string; // String porque vem do JSON, vira Date no banco
}

export class CreateClientDto {
  @ApiProperty({
    example: 'Maria Silva',
    description: 'Nome do responsável (mãe/pai)',
  })
  @IsString()
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty({
    example: '(11) 98888-8888',
    description: 'Telefone principal',
  })
  @IsString()
  @MinLength(10, { message: 'Telefone inválido' })
  phone: string;

  @ApiProperty({
    example: 'maria@email.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  email?: string;

  @ApiProperty({
    type: [ChildDto],
    description: 'Dados das crianças',
    example: [{ name: 'Ana Silva', birthday: '2020-03-15' }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChildDto) // Transforma plain object em ChildDto
  children: ChildDto[];

  @ApiProperty({
    enum: ClientSource,
    default: ClientSource.INSTAGRAM,
  })
  @IsOptional()
  @IsEnum(ClientSource)
  source?: ClientSource;

  @ApiProperty({
    example: 'Cliente muito atencioso',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
