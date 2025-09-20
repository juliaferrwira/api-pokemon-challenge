import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Trainer } from './trainer.entity';
import { TeamPokemon } from './team-pokemon.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nomeDoTime: string;

  @Column()
  treinadorId: number;

  @ManyToOne(() => Trainer, trainer => trainer.times)
  @JoinColumn({ name: 'treinadorId' })
  treinador: Trainer;

  @OneToMany(() => TeamPokemon, teamPokemon => teamPokemon.time)
  pokemons: TeamPokemon[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
