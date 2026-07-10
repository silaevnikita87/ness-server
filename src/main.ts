import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // bodyParser: false - אנחנו קוראים את גוף הבקשה ידנית (תמונות גולמיות)
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  const express = require('express');
  // JSON רק לנתיבים של voice (לא לתמונות)
  app.use('/voice', express.json());

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Ness server listening on port ${port}`);
}
bootstrap();
