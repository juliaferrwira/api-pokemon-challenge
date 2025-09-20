import { TrainerRepository } from '../repositories/trainer.repository';
import { CreateTrainerDto, UpdateTrainerDto, TrainerResponseDto } from '../dtos/trainer.dto';
import { Trainer } from '../entities/trainer.entity';

export class TrainerService {
  constructor(private trainerRepository: TrainerRepository) {}

  async create(createTrainerDto: CreateTrainerDto): Promise<TrainerResponseDto> {
    const trainer = await this.trainerRepository.create(createTrainerDto);
    return this.mapToResponseDto(trainer);
  }

  async findAll(): Promise<TrainerResponseDto[]> {
    const trainers = await this.trainerRepository.findAll();
    return trainers.map(trainer => this.mapToResponseDto(trainer));
  }

  async findById(id: number): Promise<TrainerResponseDto> {
    const trainer = await this.trainerRepository.findById(id);
    if (!trainer) {
      throw new Error(`Treinador com ID ${id} não encontrado`);
    }
    return this.mapToResponseDto(trainer);
  }

  async update(id: number, updateTrainerDto: UpdateTrainerDto): Promise<TrainerResponseDto> {
    const existingTrainer = await this.trainerRepository.findById(id);
    if (!existingTrainer) {
      throw new Error(`Treinador com ID ${id} não encontrado`);
    }

    const updatedTrainer = await this.trainerRepository.update(id, updateTrainerDto);
    return this.mapToResponseDto(updatedTrainer);
  }

  async delete(id: number): Promise<void> {
    const existingTrainer = await this.trainerRepository.findById(id);
    if (!existingTrainer) {
      throw new Error(`Treinador com ID ${id} não encontrado`);
    }

    const deleted = await this.trainerRepository.delete(id);
    if (!deleted) {
      throw new Error('Erro ao deletar treinador');
    }
  }

  private mapToResponseDto(trainer: Trainer): TrainerResponseDto {
    return {
      id: trainer.id,
      nome: trainer.nome,
      cidadeOrigem: trainer.cidadeOrigem,
      createdAt: trainer.createdAt,
      updatedAt: trainer.updatedAt,
    };
  }
}
