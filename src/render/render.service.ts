import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package.entity';
import { Render } from './render.entity';
import { CreatePackageDTO } from './dto/package.dto';
import { CreateRenderDTO } from './dto/create-render.dto';

@Injectable()
export class RenderService {
    constructor(@InjectRepository(Package) private packageRepository: Repository<Package>,
                @InjectRepository(Render) private renderRepository: Repository<Render>){}
    
    createPackage(packageRender: CreatePackageDTO){
        const NewPackage = this.packageRepository.create(packageRender);
        return this.packageRepository.save(NewPackage);
    }

    createRender(render: CreateRenderDTO){
        const NewRender = this.renderRepository.create(render);
        return this.renderRepository.save(NewRender);
    }
}
