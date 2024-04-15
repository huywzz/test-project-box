import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void>{
  const app = await NestFactory.create(AppModule);
  const port = 3030;
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter());
   const config = new DocumentBuilder()
     .setTitle('Cats example')
     .setDescription('The cats API description')
     .setVersion('1.0')
     .addTag('cats')
     .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);
  // app.setGlobalPrefix('api');
  await app.listen(port,()=>{
    console.log(`server run on http://localhost:${port}/`);
    
  });
}
bootstrap()