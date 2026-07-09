import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensesModule } from './senses/senses.module';
import { VoiceModule } from './voice/voice.module';
import { DownloadModule } from './download/download.module';

@Module({
  imports: [SensesModule, VoiceModule, DownloadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
