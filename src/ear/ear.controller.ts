import { Controller, Post, Get, Req, Res, Headers, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';

/**
 * EarController — אוזן: תיבת דואר לאודיו.
 *   POST /senses/ear      — הגוף מעלה הקלטה (audio bytes)
 *   GET  /senses/ear      — הבית מושך (דורש X-House-Token)
 *   GET  /senses/ear/status
 */
@Controller('senses/ear')
export class EarController {
  private audio: Buffer | null = null;
  private time: Date | null = null;
  private transcript = '';
  private tTime: Date | null = null;

  @Post()
  upload(@Req() req: Request, @Res() res: Response): void {
    const chunks: Buffer[] = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      this.audio = Buffer.concat(chunks);
      this.time = new Date();
      res.json({ ok: true, bytes: this.audio.length });
    });
  }

  @Post('transcript')
  setTranscript(@Req() req: Request, @Res() res: Response): void {
    const chunks: Buffer[] = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      this.transcript = Buffer.concat(chunks).toString('utf8');
      this.tTime = new Date();
      res.json({ ok: true });
    });
  }

  @Get('transcript')
  getTranscript() {
    const out = { text: this.transcript, time: this.tTime };
    this.transcript = '';
    this.tTime = null;
    return out;
  }

  @Get('status')
  status() {
    return { hasAudio: !!this.audio, time: this.time };
  }

  @Get()
  pull(@Headers('x-house-token') token: string, @Res() res: Response): void {
    if (!process.env.HOUSE_TOKEN || token !== process.env.HOUSE_TOKEN)
      throw new UnauthorizedException();
    if (!this.audio) { res.status(404).end(); return; }
    const a = this.audio;
    this.audio = null; // נמשך פעם אחת
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(a);
  }
}
