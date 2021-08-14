import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enviroment } from './enviroment/enviroment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(
    enviroment.app.port, 
    enviroment.app.host, 
    () => console.log(`Link address ${enviroment.app.domain}`));
}
bootstrap();
