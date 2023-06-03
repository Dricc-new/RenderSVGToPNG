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
    
    async createPackage(packageRender: CreatePackageDTO){
        const NewPackage = this.packageRepository.create(packageRender);
        return await this.packageRepository.save(NewPackage);
    }

    getPackage(id: number){
        return this.packageRepository.findOne({
            where:{
                id
            }
        });
    }

    deletePackage(id: number){
        this.packageRepository.delete({id});
    }
    
    deleteRender(id: number){
        this.renderRepository.delete({id});
    }

    async createRender(render: CreateRenderDTO){
        const NewRender = this.renderRepository.create(render);
        const item = await this.renderRepository.save(NewRender);
        console.log(item);
        // una ves guardado el dato en la base de dato comprobamos si ya el packeage esta completo
        // If completed 
        //     Send by email
        //         If it was sent 
        //             Destroy files
        //             Destroy items in the database
        //             Destroy package in the database
    }
}
