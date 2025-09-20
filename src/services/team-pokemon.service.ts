import { TeamPokemonRepository } from '../repositories/team-pokemon.repository';
import { TeamRepository } from '../repositories/team.repository';
import { PokeApiService } from './poke-api.service';
import { AddPokemonToTeamDto, TeamPokemonResponseDto, PokemonDetailsDto } from '../dtos/team-pokemon.dto';

export class TeamPokemonService {
  private maxPokemonPerTeam = 6;

  constructor(
    private teamPokemonRepository: TeamPokemonRepository,
    private teamRepository: TeamRepository,
    private pokeApiService: PokeApiService,
  ) {}

  async addPokemonToTeam(teamId: number, addPokemonDto: AddPokemonToTeamDto): Promise<TeamPokemonResponseDto> {
    // Verifica se o time existe
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new Error(`Time com ID ${teamId} não encontrado`);
    }

    // Verifica se o time já tem o máximo de Pokémon
    const currentPokemonCount = await this.teamPokemonRepository.countByTeamId(teamId);
    if (currentPokemonCount >= this.maxPokemonPerTeam) {
      throw new Error(`Time já possui o máximo de ${this.maxPokemonPerTeam} Pokémon`);
    }

    // Verifica se o Pokémon já está no time
    const existingPokemon = await this.teamPokemonRepository.findByTeamIdAndPokemonId(
      teamId, 
      addPokemonDto.pokemonIdOuNome
    );
    if (existingPokemon) {
      throw new Error('Pokémon já está neste time');
    }

    // Valida se o Pokémon existe na PokéAPI
    const pokemonDetails = await this.pokeApiService.getPokemonByIdOrName(addPokemonDto.pokemonIdOuNome);

    // Adiciona o Pokémon ao time
    const teamPokemon = await this.teamPokemonRepository.create({
      timeId: teamId,
      pokemonIdOuNome: addPokemonDto.pokemonIdOuNome.toLowerCase(),
    });

    return {
      id: teamPokemon.id,
      timeId: teamPokemon.timeId,
      pokemonIdOuNome: teamPokemon.pokemonIdOuNome,
      createdAt: teamPokemon.createdAt,
      pokemonDetails,
    };
  }

  async removePokemonFromTeam(teamId: number, pokemonIdOuNome: string): Promise<void> {
    // Verifica se o time existe
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new Error(`Time com ID ${teamId} não encontrado`);
    }

    // Verifica se o Pokémon está no time
    const teamPokemon = await this.teamPokemonRepository.findByTeamIdAndPokemonId(teamId, pokemonIdOuNome);
    if (!teamPokemon) {
      throw new Error('Pokémon não encontrado neste time');
    }

    const deleted = await this.teamPokemonRepository.deleteByTeamIdAndPokemonId(teamId, pokemonIdOuNome);
    if (!deleted) {
      throw new Error('Erro ao remover Pokémon do time');
    }
  }

  async getTeamPokemons(teamId: number): Promise<TeamPokemonResponseDto[]> {
    // Verifica se o time existe
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new Error(`Time com ID ${teamId} não encontrado`);
    }

    const teamPokemons = await this.teamPokemonRepository.findByTeamId(teamId);
    
    // Enriquece com dados da PokéAPI
    const enrichedPokemons = [];
    for (const teamPokemon of teamPokemons) {
      try {
        const pokemonDetails = await this.pokeApiService.getPokemonByIdOrName(teamPokemon.pokemonIdOuNome);
        enrichedPokemons.push({
          id: teamPokemon.id,
          timeId: teamPokemon.timeId,
          pokemonIdOuNome: teamPokemon.pokemonIdOuNome,
          createdAt: teamPokemon.createdAt,
          pokemonDetails,
        });
      } catch (error) {
        // Se não conseguir os detalhes, retorna sem eles
        enrichedPokemons.push({
          id: teamPokemon.id,
          timeId: teamPokemon.timeId,
          pokemonIdOuNome: teamPokemon.pokemonIdOuNome,
          createdAt: teamPokemon.createdAt,
          pokemonDetails: null,
        });
      }
    }

    return enrichedPokemons;
  }

  async getPokemonDetails(pokemonIdOuNome: string): Promise<PokemonDetailsDto> {
    return await this.pokeApiService.getPokemonByIdOrName(pokemonIdOuNome);
  }
}
