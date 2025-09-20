import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TeamService } from '../services/team.service';
import { CreateTeamDto, UpdateTeamDto, TeamResponseDto } from '../dtos/team.dto';

@ApiTags('Times')
@Controller('teams')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo time' })
  @ApiResponse({ status: 201, description: 'Time criado com sucesso', type: TeamResponseDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createTeamDto: CreateTeamDto): Promise<TeamResponseDto> {
    return await this.teamService.create(createTeamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar times' })
  @ApiQuery({ name: 'trainerId', required: false, description: 'ID do treinador para filtrar times' })
  @ApiResponse({ status: 200, description: 'Lista de times', type: [TeamResponseDto] })
  async findAll(@Query('trainerId') trainerId?: string): Promise<TeamResponseDto[]> {
    if (trainerId) {
      return await this.teamService.findByTrainerId(parseInt(trainerId));
    }
    return await this.teamService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar time por ID' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({ status: 200, description: 'Time encontrado', type: TeamResponseDto })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async findOne(@Param('id') id: number): Promise<TeamResponseDto> {
    return await this.teamService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar time' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({ status: 200, description: 'Time atualizado com sucesso', type: TeamResponseDto })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async update(@Param('id') id: number, @Body() updateTeamDto: UpdateTeamDto): Promise<TeamResponseDto> {
    return await this.teamService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar time' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({ status: 200, description: 'Time deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.teamService.delete(id);
    return { message: 'Time deletado com sucesso' };
  }
}
