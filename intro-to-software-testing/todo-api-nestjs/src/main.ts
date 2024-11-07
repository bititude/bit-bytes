import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //config instance
  const configService = app.get<ConfigService>(ConfigService);

  // enable cors
  app.enableCors({
    credentials: true,
    origin: [
      configService.get<string>('FRONTEND_ROOT')!,
      ...[
        configService.get<string>('NODE_ENV') != 'production'
          ? 'http://localhost:4000'
          : '',
      ],
    ],
  });

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
