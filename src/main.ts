import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap(): Promise<void>{
  const app = await NestFactory.create(AppModule);
  const port = 3030;
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.setGlobalPrefix('api');
  await app.listen(port,()=>{
    console.log(`server run on http://localhost:${port}/`);
    
  });
}
bootstrap()