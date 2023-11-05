import { Module } from '@nestjs/common';
import { RenderController } from './render.controller';
import { RenderService } from './render.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Render } from './render.entity';
import { Pack } from './pack.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Render, Pack]), MailModule],
  controllers: [RenderController],
  providers: [RenderService]
})
export class RenderModule { }
