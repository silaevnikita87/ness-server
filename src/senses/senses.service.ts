import { Injectable } from '@nestjs/common';

/**
 * SensesService — מנהל את החושים של Ness.
 * בשלב זה: שומר בזיכרון את התמונה האחרונה שהגוף (הטלפון) שלח.
 * בשלב 2 נשדרג לאחסון קבוע וריבוי גופים.
 */
@Injectable()
export class SensesService {
  // ── עין ──
  private lastImage: Buffer | null = null;
  private lastImageTime: Date | null = null;

  // הגוף שולח תמונה → השרת שומר
  saveImage(image: Buffer): void {
    this.lastImage = image;
    this.lastImageTime = new Date();
  }

  // המוח (Ness) מושך את התמונה האחרונה
  getLastImage(): Buffer | null {
    return this.lastImage;
  }

  // מצב העין: האם יש תמונה ומתי הגיעה
  getStatus(): { hasImage: boolean; time: Date | null } {
    return {
      hasImage: this.lastImage !== null,
      time: this.lastImageTime,
    };
  }
}
