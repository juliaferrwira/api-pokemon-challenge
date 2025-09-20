import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from '../entities/trainer.entity';
import { TrainerController } from '../controllers/trainer.controller';
import { TrainerService } from '../services/trainer.service';
import { TrainerRepository } from '../repositories/trainer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  controllers: [TrainerController],
  providers: [
    {
      provide: TrainerRepository,
      useFactory: (trainerRepository: Repository<Trainer>) => new TrainerRepository(trainerRepository),
      inject: [getRepositoryToken(Trainer)],
    },
    TrainerService,
  ],
  exports: [TrainerService, TrainerRepository],
})
export class TrainerModule {}
