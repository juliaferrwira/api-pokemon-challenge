import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainerDto {
  @ApiProperty({ description: 'Nome do treinador', example: 'Ash Ketchum' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @ApiProperty({ description: 'Cidade de origem do treinador', example: 'Pallet Town', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  cidadeOrigem?: string;
}

export class UpdateTrainerDto {
  @ApiProperty({ description: 'Nome do treinador', example: 'Ash Ketchum', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nome?: string;

  @ApiProperty({ description: 'Cidade de origem do treinador', example: 'Pallet Town', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  cidadeOrigem?: string;
}

export class TrainerResponseDto {
  @ApiProperty({ description: 'ID único do treinador' })
  id: number;

  @ApiProperty({ description: 'Nome do treinador' })
  nome: string;

  @ApiProperty({ description: 'Cidade de origem do treinador' })
  cidadeOrigem?: string;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
