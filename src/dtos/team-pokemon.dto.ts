import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddPokemonToTeamDto {
  @ApiProperty({ description: 'ID ou nome do Pokémon na PokéAPI', example: 'pikachu' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  pokemonIdOuNome: string;
}

export class PokemonDetailsDto {
  @ApiProperty({ description: 'ID do Pokémon na PokéAPI' })
  id: number;

  @ApiProperty({ description: 'Nome do Pokémon' })
  name: string;

  @ApiProperty({ description: 'URL da imagem/sprite do Pokémon' })
  sprite: string;

  @ApiProperty({ description: 'Tipos do Pokémon', type: [String] })
  types: string[];

  @ApiProperty({ description: 'Altura do Pokémon em decímetros' })
  height: number;

  @ApiProperty({ description: 'Peso do Pokémon em hectogramas' })
  weight: number;
}

export class TeamPokemonResponseDto {
  @ApiProperty({ description: 'ID único do registro' })
  id: number;

  @ApiProperty({ description: 'ID do time' })
  timeId: number;

  @ApiProperty({ description: 'ID ou nome do Pokémon na PokéAPI' })
  pokemonIdOuNome: string;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Detalhes do Pokémon obtidos da PokéAPI', type: PokemonDetailsDto })
  pokemonDetails: PokemonDetailsDto;
}
