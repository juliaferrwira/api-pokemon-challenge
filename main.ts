import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configura CORS
  app.enableCors();

  // Configura Swagger
  const config = new DocumentBuilder()
    .setTitle('Pokémon Challenge API')
    .setDescription('API RESTful para gerenciar Times de Pokémon criados por Treinadores')
    .setVersion('1.0')
    .addTag('Treinadores', 'Operações relacionadas aos treinadores')
    .addTag('Times', 'Operações relacionadas aos times')
    .addTag('Pokémon dos Times', 'Operações relacionadas aos Pokémon nos times')
    .addTag('Pokémon', 'Operações relacionadas aos Pokémon da PokéAPI')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Pokémon Challenge API',
    customfavIcon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
