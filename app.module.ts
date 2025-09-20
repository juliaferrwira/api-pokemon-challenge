import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TrainerModule } from './src/modules/trainer.module';
import { TeamModule } from './src/modules/team.module';
import { TeamPokemonModule } from './src/modules/team-pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'pokemon_db',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    }),
    TrainerModule,
    TeamModule,
    TeamPokemonModule,
  ],
})
export class AppModule {}
