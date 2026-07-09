import { Module } from '@nestjs/common';
import { SensesController } from './senses.controller';
import { SensesService } from './senses.service';

@Module({
  controllers: [SensesController],
  providers: [SensesService],
})
export class SensesModule {}
