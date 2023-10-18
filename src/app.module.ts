import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RenderModule } from './render/render.module';
import { ServerModule } from './server/server.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [RenderModule, ServerModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username:'root',
    password:'',
    database:'apirender',
    entities:[__dirname+'/**/*.entity{.ts,.js}'],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
