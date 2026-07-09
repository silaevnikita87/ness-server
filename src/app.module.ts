import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensesModule } from './senses/senses.module';
import { VoiceModule } from './voice/voice.module';

@Module({
  imports: [SensesModule, VoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
