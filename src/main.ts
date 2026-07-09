import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  const express = require('express');
  // תמונות גולמיות (מהעין)
  app.use(express.raw({ type: 'image/jpeg', limit: '10mb' }));
  // JSON (להודעות קול)
  app.use(express.json());

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Ness server listening on port ${port}`);
}
bootstrap();
