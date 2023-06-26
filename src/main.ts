import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './module/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe(
  //   { whitelist: true }
  //   ))
  app.useLogger(new LoggerService())
  await app.listen(3000);
}
bootstrap();
