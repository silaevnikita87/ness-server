import { Injectable } from '@nestjs/common';

export interface Question {
  id: string;
  message: string;
  time: Date;
}

/**
 * ChatService — תיבת דואר לטקסט/קול (המחברת, §9א).
 * הגוף שואל → הבית (הסוכן) מושך, חושב, ומחזיר → הגוף מושך תשובה.
 */
@Injectable()
export class ChatService {
  private queue: Question[] = [];
  private answers = new Map<string, string>();
  private counter = 0;

  ask(message: string): string {
    const id = `q${Date.now()}_${++this.counter}`;
    this.queue.push({ id, message, time: new Date() });
    return id;
  }

  pending(): Question[] {
    const items = this.queue;
    this.queue = [];
    return items;
  }

  reply(id: string, answer: string): void {
    this.answers.set(id, answer);
  }

  answer(id: string): { ready: boolean; answer: string } {
    const a = this.answers.get(id);
    if (a === undefined) return { ready: false, answer: '' };
    this.answers.delete(id);
    return { ready: true, answer: a };
  }
}
