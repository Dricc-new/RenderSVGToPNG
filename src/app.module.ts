import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RenderModule } from './render/render.module';
import { ServerModule } from './server/server.module';

@Module({
  imports: [RenderModule, ServerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
