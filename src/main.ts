import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './shared/enviroment/enviroment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(
    env.app.port, 
    env.app.host, 
    () => console.log(`Link address ${env.app.domain}`));
}
bootstrap();
