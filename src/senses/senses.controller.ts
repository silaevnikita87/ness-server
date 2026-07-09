import {
  Controller,
  Post,
  Get,
  Res,
  Req,
  HttpCode,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { SensesService } from './senses.service';

/**
 * SensesController — הדלת של הגוף ושל המוח.
 *
 * שלושה endpoints:
 *   POST /senses/eye     — הגוף (הטלפון) שולח תמונה
 *   GET  /senses/eye     — המוח (Ness) מושך את התמונה האחרונה
 *   GET  /senses/status  — בדיקת מצב (יש תמונה? מתי?)
 */
@Controller('senses')
export class SensesController {
  constructor(private readonly senses: SensesService) {}

  // ── הגוף שולח תמונה ──
  // הטלפון שולח את גוף-הבקשה כ-bytes של תמונה (image/jpeg)
  @Post('eye')
  @HttpCode(200)
  async receiveEye(@Req() req: Request): Promise<{ ok: boolean }> {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(chunk as Buffer);
    }
    const image = Buffer.concat(chunks);
    this.senses.saveImage(image);
    return { ok: true };
  }

  // ── המוח מושך את התמונה האחרונה ──
  @Get('eye')
  getEye(@Res() res: Response): void {
    const image = this.senses.getLastImage();
    if (!image) {
      res.status(404).json({ error: 'אין עדיין תמונה' });
      return;
    }
    res.set('Content-Type', 'image/jpeg');
    res.send(image);
  }

  // ── בדיקת מצב ──
  @Get('status')
  getStatus() {
    return this.senses.getStatus();
  }
}
