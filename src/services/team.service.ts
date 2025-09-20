import { TeamRepository } from '../repositories/team.repository';
import { TrainerRepository } from '../repositories/trainer.repository';
import { CreateTeamDto, UpdateTeamDto, TeamResponseDto } from '../dtos/team.dto';
import { Team } from '../entities/team.entity';

export class TeamService {
  constructor(
    private teamRepository: TeamRepository,
    private trainerRepository: TrainerRepository,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<TeamResponseDto> {
    // Verifica se o treinador existe
    const trainer = await this.trainerRepository.findById(createTeamDto.treinadorId);
    if (!trainer) {
      throw new Error(`Treinador com ID ${createTeamDto.treinadorId} não encontrado`);
    }

    const team = await this.teamRepository.create(createTeamDto);
    return this.mapToResponseDto(team);
  }

  async findAll(): Promise<TeamResponseDto[]> {
    const teams = await this.teamRepository.findAll();
    return teams.map(team => this.mapToResponseDto(team));
  }

  async findById(id: number): Promise<TeamResponseDto> {
    const team = await this.teamRepository.findById(id);
    if (!team) {
      throw new Error(`Time com ID ${id} não encontrado`);
    }
    return this.mapToResponseDto(team);
  }

  async findByTrainerId(trainerId: number): Promise<TeamResponseDto[]> {
    // Verifica se o treinador existe
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) {
      throw new Error(`Treinador com ID ${trainerId} não encontrado`);
    }

    const teams = await this.teamRepository.findByTrainerId(trainerId);
    return teams.map(team => this.mapToResponseDto(team));
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<TeamResponseDto> {
    const existingTeam = await this.teamRepository.findById(id);
    if (!existingTeam) {
      throw new Error(`Time com ID ${id} não encontrado`);
    }

    const updatedTeam = await this.teamRepository.update(id, updateTeamDto);
    return this.mapToResponseDto(updatedTeam);
  }

  async delete(id: number): Promise<void> {
    const existingTeam = await this.teamRepository.findById(id);
    if (!existingTeam) {
      throw new Error(`Time com ID ${id} não encontrado`);
    }

    const deleted = await this.teamRepository.delete(id);
    if (!deleted) {
      throw new Error('Erro ao deletar time');
    }
  }

  private mapToResponseDto(team: Team): TeamResponseDto {
    return {
      id: team.id,
      nomeDoTime: team.nomeDoTime,
      treinadorId: team.treinadorId,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
    };
  }
}
