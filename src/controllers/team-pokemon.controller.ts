import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TeamPokemonService } from '../services/team-pokemon.service';
import { AddPokemonToTeamDto, TeamPokemonResponseDto, PokemonDetailsDto } from '../dtos/team-pokemon.dto';

@ApiTags('Pokémon dos Times')
@Controller('teams/:teamId/pokemons')
export class TeamPokemonController {
  constructor(private teamPokemonService: TeamPokemonService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar Pokémon ao time' })
  @ApiParam({ name: 'teamId', description: 'ID do time' })
  @ApiResponse({ status: 201, description: 'Pokémon adicionado ao time com sucesso', type: TeamPokemonResponseDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou Pokémon não encontrado' })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async addPokemonToTeam(@Param('teamId') teamId: number, @Body() addPokemonDto: AddPokemonToTeamDto): Promise<TeamPokemonResponseDto> {
    return await this.teamPokemonService.addPokemonToTeam(teamId, addPokemonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Pokémon do time' })
  @ApiParam({ name: 'teamId', description: 'ID do time' })
  @ApiResponse({ status: 200, description: 'Lista de Pokémon do time', type: [TeamPokemonResponseDto] })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async getTeamPokemons(@Param('teamId') teamId: number): Promise<TeamPokemonResponseDto[]> {
    return await this.teamPokemonService.getTeamPokemons(teamId);
  }

  @Delete(':pokemonIdOuNome')
  @ApiOperation({ summary: 'Remover Pokémon do time' })
  @ApiParam({ name: 'teamId', description: 'ID do time' })
  @ApiParam({ name: 'pokemonIdOuNome', description: 'ID ou nome do Pokémon' })
  @ApiResponse({ status: 200, description: 'Pokémon removido do time com sucesso' })
  @ApiResponse({ status: 404, description: 'Time ou Pokémon não encontrado' })
  async removePokemonFromTeam(@Param('teamId') teamId: number, @Param('pokemonIdOuNome') pokemonIdOuNome: string): Promise<{ message: string }> {
    await this.teamPokemonService.removePokemonFromTeam(teamId, pokemonIdOuNome);
    return { message: 'Pokémon removido do time com sucesso' };
  }
}

@ApiTags('Pokémon')
@Controller('pokemons')
export class PokemonController {
  constructor(private teamPokemonService: TeamPokemonService) {}

  @Get(':pokemonIdOuNome')
  @ApiOperation({ summary: 'Buscar detalhes de um Pokémon' })
  @ApiParam({ name: 'pokemonIdOuNome', description: 'ID ou nome do Pokémon' })
  @ApiResponse({ status: 200, description: 'Detalhes do Pokémon', type: PokemonDetailsDto })
  @ApiResponse({ status: 404, description: 'Pokémon não encontrado' })
  async getPokemonDetails(@Param('pokemonIdOuNome') pokemonIdOuNome: string): Promise<PokemonDetailsDto> {
    return await this.teamPokemonService.getPokemonDetails(pokemonIdOuNome);
  }
}
