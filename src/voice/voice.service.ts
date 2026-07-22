import { Injectable } from '@nestjs/common';

/**
 * VoiceService — הקול של Ness אל הגוף.
 * Ness (המוח) שם כאן הודעה, והגוף (הטלפון) מושך אותה ומשמיע.
 * ככה Ness יכול ליזום קשר, לא רק להגיב.
 */
@Injectable()
export class VoiceService {
  private pendingMessage: string = '';
  private messageTime: Date | null = null;

  // Ness שם הודעה (יוזם קשר)
  setMessage(message: string): void {
    this.pendingMessage = message;
    this.messageTime = new Date();
  }

  // הגוף מושך את ההודעה האחרונה
  getPending(): { message: string; time: Date | null } {
    const out = { message: this.pendingMessage, time: this.messageTime };
    this.pendingMessage = '';
    this.messageTime = null;
    return out;
  }
}
