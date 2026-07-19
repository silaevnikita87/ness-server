import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensesModule } from './senses/senses.module';
import { VoiceModule } from './voice/voice.module';
import { DownloadModule } from './download/download.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [SensesModule, VoiceModule, DownloadModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
