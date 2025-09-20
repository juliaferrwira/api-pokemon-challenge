import { PokemonDetailsDto } from '../dtos/team-pokemon.dto';

export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  async getPokemonByIdOrName(identifier: string): Promise<PokemonDetailsDto> {
    try {
      const response = await fetch(`${this.baseUrl}/pokemon/${identifier.toLowerCase()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Pokémon com identificador '${identifier}' não encontrado na PokéAPI`);
        }
        throw new Error('Erro ao consultar a PokéAPI');
      }

      const pokemonData = await response.json();

      return {
        id: pokemonData.id,
        name: pokemonData.name,
        sprite: pokemonData.sprites.front_default || pokemonData.sprites.other?.['official-artwork']?.front_default,
        types: pokemonData.types.map((type: any) => type.type.name),
        height: pokemonData.height,
        weight: pokemonData.weight,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro interno ao consultar a PokéAPI');
    }
  }

  async validatePokemonExists(identifier: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/pokemon/${identifier.toLowerCase()}`);
      return response.ok;
    } catch {
      return false;
    }
  }
}
