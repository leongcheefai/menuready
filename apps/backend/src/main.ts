import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Increase body size limit to handle large base64-encoded images
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Enable CORS for frontend
  app.enableCors();

  // Serve static files from uploads directory
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
