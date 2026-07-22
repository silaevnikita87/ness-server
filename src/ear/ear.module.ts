import { Module } from '@nestjs/common';
import { EarController } from './ear.controller';

@Module({ controllers: [EarController] })
export class EarModule {}
