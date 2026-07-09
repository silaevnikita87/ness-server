import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensesModule } from './senses/senses.module';

@Module({
  imports: [SensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
