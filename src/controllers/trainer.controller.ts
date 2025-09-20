import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TrainerService } from '../services/trainer.service';
import { CreateTrainerDto, UpdateTrainerDto, TrainerResponseDto } from '../dtos/trainer.dto';

@ApiTags('Treinadores')
@Controller('trainers')
export class TrainerController {
  constructor(private trainerService: TrainerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo treinador' })
  @ApiResponse({ status: 201, description: 'Treinador criado com sucesso', type: TrainerResponseDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createTrainerDto: CreateTrainerDto): Promise<TrainerResponseDto> {
    return await this.trainerService.create(createTrainerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os treinadores' })
  @ApiResponse({ status: 200, description: 'Lista de treinadores', type: [TrainerResponseDto] })
  async findAll(): Promise<TrainerResponseDto[]> {
    return await this.trainerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar treinador por ID' })
  @ApiParam({ name: 'id', description: 'ID do treinador' })
  @ApiResponse({ status: 200, description: 'Treinador encontrado', type: TrainerResponseDto })
  @ApiResponse({ status: 404, description: 'Treinador não encontrado' })
  async findOne(@Param('id') id: number): Promise<TrainerResponseDto> {
    return await this.trainerService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar treinador' })
  @ApiParam({ name: 'id', description: 'ID do treinador' })
  @ApiResponse({ status: 200, description: 'Treinador atualizado com sucesso', type: TrainerResponseDto })
  @ApiResponse({ status: 404, description: 'Treinador não encontrado' })
  async update(@Param('id') id: number, @Body() updateTrainerDto: UpdateTrainerDto): Promise<TrainerResponseDto> {
    return await this.trainerService.update(id, updateTrainerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar treinador' })
  @ApiParam({ name: 'id', description: 'ID do treinador' })
  @ApiResponse({ status: 200, description: 'Treinador deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Treinador não encontrado' })
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.trainerService.delete(id);
    return { message: 'Treinador deletado com sucesso' };
  }
}
