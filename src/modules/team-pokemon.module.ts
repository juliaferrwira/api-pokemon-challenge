import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPokemon } from '../entities/team-pokemon.entity';
import { TeamPokemonController, PokemonController } from '../controllers/team-pokemon.controller';
import { TeamPokemonService } from '../services/team-pokemon.service';
import { TeamPokemonRepository } from '../repositories/team-pokemon.repository';
import { PokeApiService } from '../services/poke-api.service';
import { TeamModule } from './team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamPokemon]),
    TeamModule,
  ],
  controllers: [TeamPokemonController, PokemonController],
  providers: [TeamPokemonService, TeamPokemonRepository, PokeApiService],
  exports: [TeamPokemonService, PokeApiService],
})
export class TeamPokemonModule {}
