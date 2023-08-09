import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost', 'http://wbtestdomain.ru'],
    methods: ['GET'],
  });
  const config = new DocumentBuilder()
    .setTitle('Test backend')
    .setDescription('Test backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
