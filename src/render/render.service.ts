import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Render } from './render.entity';
import { CreatePackDTO } from './dto/pack.dto';
import { CreateRenderDTO } from './dto/create-render.dto';
import { Pack } from './pack.entity';
import { v4 } from 'uuid';
const sharp = require("sharp");
const QRMaker = require("qrcode");
const fs = require('fs/promises');

@Injectable()
export class RenderService {
    constructor(@InjectRepository(Pack) private packRepository: Repository<Pack>,
        @InjectRepository(Render) private renderRepository: Repository<Render>) { }

    createPack(pack: CreatePackDTO) {
        const NewPack = this.packRepository.create(pack);
        return this.packRepository.save(NewPack);
    }

    getPack(id: number) {
        return this.packRepository.findOne({
            where: { id },
            relations: ['renders']
        });
    }

    async deletePack(id: number) {
        await this.packRepository.delete({ id });
    }

    async deleteRender(id: number) {
        await this.renderRepository.delete({ id });
    }

    createRender(render: CreateRenderDTO) {
        const NewRender = this.renderRepository.create(render);
        return this.renderRepository.save(NewRender);
    }

    async generateQR(value: string) {
        return await QRMaker.toDataURL(value, {
            margin: 1, color: { dark: "#000000ff", light: "#00000000" }
        })
    }

    async generateTicket(values: Array<any>, content: any, packId: any) {
        // Generate a random filename 
        const filename = v4();
        values.forEach((item) => {
            content = content.replace('{{' + item.key + '}}', item.data);
        });

        const svgPath = `storage/temp/${filename}.svg`
        await fs.writeFile(svgPath, content)
        await sharp(svgPath)
            .png()
            .toFile(`storage/temp/${filename}.png`)
        // Delete SVG file
        await fs.unlink(svgPath)
        // Load data to render
        const render = new CreateRenderDTO;
        render.filename = filename;
        render.packId = packId;
        return this.createRender(render);
    }
}
