import { Module} from '@nestjs/common';
import { RenderController } from './render.controller';
import { RenderService } from './render.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Render } from './render.entity';
import { Package } from './package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Render,Package])],
  controllers: [RenderController],
  providers: [RenderService]
})
export class RenderModule {}
