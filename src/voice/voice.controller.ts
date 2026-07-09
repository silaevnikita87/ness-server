import { Controller, Post, Get, Body } from '@nestjs/common';
import { VoiceService } from './voice.service';

/**
 * VoiceController — קול Ness אל הגוף.
 *   POST /voice/say      — Ness (המוח) שם הודעה
 *   GET  /voice/pending  — הגוף מושך את ההודעה האחרונה
 */
@Controller('voice')
export class VoiceController {
  constructor(private readonly voice: VoiceService) {}

  // Ness שם הודעה
  @Post('say')
  say(@Body() body: { message: string }): { ok: boolean } {
    this.voice.setMessage(body.message || '');
    return { ok: true };
  }

  // הגוף מושך
  @Get('pending')
  getPending() {
    return this.voice.getPending();
  }
}
