import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RenderModule } from './render/render.module';
import { ServerModule } from './server/server.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [RenderModule, ServerModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username:'x01bet',
    password:'Qwe123asd',
    database:'apirender',
    entities:[__dirname+'/**/*.entity{.ts,.js}'],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
