import { Repository } from 'typeorm';
import { Trainer } from '../entities/trainer.entity';

export class TrainerRepository {
  constructor(private trainerRepository: Repository<Trainer>) {}

  async create(trainerData: Partial<Trainer>): Promise<Trainer> {
    const trainer = this.trainerRepository.create(trainerData);
    return await this.trainerRepository.save(trainer);
  }

  async findAll(): Promise<Trainer[]> {
    return await this.trainerRepository.find({
      relations: ['times'],
    });
  }

  async findById(id: number): Promise<Trainer | null> {
    return await this.trainerRepository.findOne({
      where: { id },
      relations: ['times'],
    });
  }

  async update(id: number, trainerData: Partial<Trainer>): Promise<Trainer | null> {
    await this.trainerRepository.update(id, trainerData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.trainerRepository.delete(id);
    return result.affected > 0;
  }
}
