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
 * SensesController - הדלת של הגוף ושל המוח.
 *   POST /senses/eye     - הגוף (הטלפון) שולח תמונה
 *   GET  /senses/eye     - המוח (Ness) מושך את התמונה האחרונה
 *   GET  /senses/status  - בדיקת מצב
 */
@Controller('senses')
export class SensesController {
  constructor(private readonly senses: SensesService) {}

  // הגוף שולח תמונה - קוראים את ה-stream ידנית
  @Post('eye')
  @HttpCode(200)
  receiveEye(@Req() req: Request): Promise<{ ok: boolean; size: number }> {
    return new Promise((resolve) => {
      const chunks: Buffer[] = [];
      req.on('data', (chunk: Buffer) => chunks.push(chunk));
      req.on('end', () => {
        const image = Buffer.concat(chunks);
        this.senses.saveImage(image);
        resolve({ ok: true, size: image.length });
      });
      req.on('error', () => resolve({ ok: false, size: 0 }));
    });
  }

  // המוח מושך את התמונה האחרונה
  @Get('eye')
  getEye(@Res() res: Response): void {
    const image = this.senses.getLastImage();
    if (!image || image.length === 0) {
      res.status(404).json({ error: 'no image yet' });
      return;
    }
    res.set('Content-Type', 'image/jpeg');
    res.send(image);
  }

  // בדיקת מצב
  @Get('status')
  getStatus() {
    return this.senses.getStatus();
  }
}
