import { Module} from '@nestjs/common';
import { RenderController } from './render.controller';
import { RenderService } from './render.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Render } from './render.entity';
import { Pack } from './pack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Render,Pack])],
  controllers: [RenderController],
  providers: [RenderService]
})
export class RenderModule {}
