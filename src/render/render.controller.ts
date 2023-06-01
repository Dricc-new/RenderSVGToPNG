import { Body, Controller, Post } from '@nestjs/common';
import { RenderService } from './render.service'
import { CreateRenderDTO } from './dto/render.dto';

@Controller('render')
export class RenderController {
    constructor(private renderService: RenderService){}
    
    @Post()
    Renderer(@Body() newRender: CreateRenderDTO){
        this.renderService.createRender(newRender.template,newRender.email,newRender.keys,newRender.data)
        return 'success';
    }
}
