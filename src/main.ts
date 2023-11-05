import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  
  app.enableCors({
    origin: '*'
  })

  await app.listen(configService.get('PORT'));
  console.log('App running on ', `${configService.get('APP_URL')}:${configService.get('PORT')}`)
}
bootstrap();
