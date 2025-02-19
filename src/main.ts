import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  const config = new DocumentBuilder()
    .setTitle('TODO API nestjs')
    .setDescription('The tzsk API description')
    .setVersion('1.0')
    .addTag('task')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
