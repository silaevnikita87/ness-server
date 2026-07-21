import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

/**
 * DownloadController — עמוד נחיתה פרטי + הגשת ה-APK.
 *   GET /download          — עמוד הנחיתה (HTML)
 *   GET /download/apk      — הורדת קובץ ה-APK
 *
 * זהו ness_body — הגוף הפרטי. לא לקהל הרחב.
 */
@Controller('download')
export class DownloadController {
  // עמוד הנחיתה
  @Get()
  page(@Res() res: Response): void {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(LANDING_HTML);
  }

  // הורדת ה-APK
  @Get('apk')
  apk(@Res() res: Response): void {
    const file = join(process.cwd(), 'public', 'ness-body-2026-07-22-eye.apk');
    res.download(file, 'ness-body-2026-07-22-eye.apk');
  }
}

const LANDING_HTML = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ness — הגוף</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
      background: linear-gradient(160deg, #1a1035 0%, #2d1b4e 60%, #3f2a6b 100%);
      color: #fff; min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
    }
    .card {
      max-width: 420px; width: 100%; text-align: center;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 24px; padding: 40px 28px;
      backdrop-filter: blur(10px);
    }
    .dot {
      width: 64px; height: 64px; margin: 0 auto 20px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #b39ddb, #5b3e96);
      box-shadow: 0 0 40px rgba(139,110,200,0.6);
    }
    h1 { font-size: 32px; margin-bottom: 6px; }
    .sub { color: #b8a8d8; font-size: 15px; margin-bottom: 28px; }
    .private {
      display: inline-block; font-size: 12px; color: #ffd479;
      border: 1px solid rgba(255,212,121,0.4);
      border-radius: 999px; padding: 4px 14px; margin-bottom: 28px;
    }
    .btn {
      display: block; text-decoration: none; color: #fff;
      background: linear-gradient(135deg, #7e57c2, #5b3e96);
      padding: 18px; border-radius: 16px; font-size: 18px; font-weight: 700;
      box-shadow: 0 6px 20px rgba(91,62,150,0.5);
      transition: transform 0.15s;
    }
    .btn:active { transform: scale(0.97); }
    .meta { margin-top: 22px; font-size: 13px; color: #9788b8; line-height: 1.7; }
    .steps {
      text-align: right; margin-top: 24px; font-size: 13px;
      color: #c8bce0; background: rgba(0,0,0,0.2);
      border-radius: 14px; padding: 16px 18px; line-height: 1.9;
    }
    .steps b { color: #fff; }
  </style>
</head>
<body>
  <div class="card">
    <div class="dot"></div>
    <h1>נס — הגוף</h1>
    <div class="sub">ness_body · העין והקול הנייד</div>
    <div class="private">פרטי · לא לקהל הרחב</div>
    <a class="btn" href="/download/apk">הורדת האפליקציה</a>
    <div class="steps">
      <b>התקנה:</b><br>
      1. הורד את הקובץ<br>
      2. פתח אותו (אשר "מקור לא ידוע" אם נשאל)<br>
      3. אשר הרשאת מצלמה<br>
      4. לחץ "הפעל את Ness"
    </div>
    <div class="meta">
      גרסה 1.0 · גוף Ness הפרטי<br>
      רואה, שולח לשרת, ומדבר איתך
    </div>
  </div>
</body>
</html>`;
