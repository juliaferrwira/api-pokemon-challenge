import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Team } from './team.entity';

@Entity('team_pokemons')
export class TeamPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timeId: number;

  @Column({ type: 'varchar', length: 50 })
  pokemonIdOuNome: string;

  @ManyToOne(() => Team, team => team.pokemons)
  @JoinColumn({ name: 'timeId' })
  time: Team;

  @CreateDateColumn()
  createdAt: Date;
}
