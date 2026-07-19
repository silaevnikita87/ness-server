import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { ChatService } from './chat.service';

/**
 * ChatController — ערוץ הטקסט/קול, עם שער-בית (§9א).
 *   POST /chat/ask      — הגוף שולח שאלה, מקבל id
 *   GET  /chat/answer   — הגוף מושך תשובה לפי id
 *   GET  /chat/pending  — הבית מושך שאלות (דורש X-House-Token)
 *   POST /chat/reply    — הבית מחזיר תשובה (דורש X-House-Token)
 */
@Controller('chat')
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  private guard(token: string | undefined): void {
    const expected = process.env.HOUSE_TOKEN;
    if (!expected || token !== expected) throw new UnauthorizedException();
  }

  @Post('ask')
  ask(@Body() body: { message: string }): { ok: boolean; id: string } {
    if (!body || !body.message) return { ok: false, id: '' };
    return { ok: true, id: this.chat.ask(body.message) };
  }

  @Get('answer')
  answer(@Query('id') id: string): { ready: boolean; answer: string } {
    return this.chat.answer(id);
  }

  @Get('pending')
  pending(@Headers('x-house-token') token: string) {
    this.guard(token);
    return this.chat.pending();
  }

  @Post('reply')
  reply(
    @Headers('x-house-token') token: string,
    @Body() body: { id: string; answer: string },
  ): { ok: boolean } {
    this.guard(token);
    this.chat.reply(body.id, body.answer || '');
    return { ok: true };
  }
}
