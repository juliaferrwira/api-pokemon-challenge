import { Repository } from 'typeorm';
import { TeamPokemon } from '../entities/team-pokemon.entity';

export class TeamPokemonRepository {
  constructor(private teamPokemonRepository: Repository<TeamPokemon>) {}

  async create(teamPokemonData: Partial<TeamPokemon>): Promise<TeamPokemon> {
    const teamPokemon = this.teamPokemonRepository.create(teamPokemonData);
    return await this.teamPokemonRepository.save(teamPokemon);
  }

  async findByTeamId(teamId: number): Promise<TeamPokemon[]> {
    return await this.teamPokemonRepository.find({
      where: { timeId: teamId },
      relations: ['time'],
    });
  }

  async findByTeamIdAndPokemonId(teamId: number, pokemonIdOuNome: string): Promise<TeamPokemon | null> {
    return await this.teamPokemonRepository.findOne({
      where: { 
        timeId: teamId,
        pokemonIdOuNome: pokemonIdOuNome.toLowerCase()
      },
    });
  }

  async countByTeamId(teamId: number): Promise<number> {
    return await this.teamPokemonRepository.count({
      where: { timeId: teamId },
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.teamPokemonRepository.delete(id);
    return result.affected > 0;
  }

  async deleteByTeamIdAndPokemonId(teamId: number, pokemonIdOuNome: string): Promise<boolean> {
    const result = await this.teamPokemonRepository.delete({
      timeId: teamId,
      pokemonIdOuNome: pokemonIdOuNome.toLowerCase()
    });
    return result.affected > 0;
  }
}
