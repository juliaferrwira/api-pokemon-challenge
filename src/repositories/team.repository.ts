import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';

export class TeamRepository {
  constructor(private teamRepository: Repository<Team>) {}

  async create(teamData: Partial<Team>): Promise<Team> {
    const team = this.teamRepository.create(teamData);
    return await this.teamRepository.save(team);
  }

  async findAll(): Promise<Team[]> {
    return await this.teamRepository.find({
      relations: ['treinador', 'pokemons'],
    });
  }

  async findById(id: number): Promise<Team | null> {
    return await this.teamRepository.findOne({
      where: { id },
      relations: ['treinador', 'pokemons'],
    });
  }

  async findByTrainerId(trainerId: number): Promise<Team[]> {
    return await this.teamRepository.find({
      where: { treinadorId: trainerId },
      relations: ['treinador', 'pokemons'],
    });
  }

  async update(id: number, teamData: Partial<Team>): Promise<Team | null> {
    await this.teamRepository.update(id, teamData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.teamRepository.delete(id);
    return result.affected > 0;
  }
}
