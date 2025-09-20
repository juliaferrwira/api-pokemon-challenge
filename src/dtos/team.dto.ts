import { IsString, IsOptional, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ description: 'Nome do time', example: 'Time do Ash' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nomeDoTime: string;

  @ApiProperty({ description: 'ID do treinador dono do time', example: 1 })
  @IsNumber()
  treinadorId: number;
}

export class UpdateTeamDto {
  @ApiProperty({ description: 'Nome do time', example: 'Time do Ash', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nomeDoTime?: string;
}

export class TeamResponseDto {
  @ApiProperty({ description: 'ID único do time' })
  id: number;

  @ApiProperty({ description: 'Nome do time' })
  nomeDoTime: string;

  @ApiProperty({ description: 'ID do treinador dono do time' })
  treinadorId: number;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
