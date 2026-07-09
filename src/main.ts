import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // bodyParser: false — אנחנו מקבלים תמונות גולמיות (bytes), לא JSON
  const app = await NestFactory.create(AppModule, { rawBody: true });

  // מאפשר לגוף-בקשה גדול (תמונות) — עד 10MB
  const express = require('express');
  app.use(express.raw({ type: 'image/jpeg', limit: '10mb' }));

  // Railway נותן פורט דרך משתנה-סביבה; מקומית — 3000
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Ness server listening on port ${port}`);
}
bootstrap();
