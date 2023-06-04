import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Render } from './render.entity';
import { CreatePackDTO } from './dto/pack.dto';
import { CreateRenderDTO } from './dto/create-render.dto';
import { Pack } from './pack.entity';

@Injectable()
export class RenderService {
    constructor(@InjectRepository(Pack) private packRepository: Repository<Pack>,
                @InjectRepository(Render) private renderRepository: Repository<Render>){}
    
    createPack(pack: CreatePackDTO){
        const NewPack = this.packRepository.create(pack);
        return this.packRepository.save(NewPack);
    }

    getPack(id: number){
        return this.packRepository.findOne({
            where:{id},
            relations:['renders']
        });
    }

    deletePack(id: number){
        this.packRepository.delete({id});
    }
    
    deleteRender(id: number){
        this.renderRepository.delete({id});
    }
    
    createRender(render: CreateRenderDTO){
        const NewRender = this.renderRepository.create(render);
        return this.renderRepository.save(NewRender);
    }
}
