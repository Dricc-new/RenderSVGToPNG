import { Body, Controller, Post } from '@nestjs/common';
import { RenderService } from './render.service'
import { RenderDTO } from './dto/render.dto';
import { CreatePackDTO } from './dto/pack.dto';
import { MailService } from 'src/mail/services/mail.service';
const fs = require('fs/promises');

@Controller('render')
export class RenderController {
    constructor(
        private readonly renderService: RenderService,
        private readonly mailService: MailService,

    ) { }

    @Post()
    async Renderer(@Body() newRender: RenderDTO) {
        const content = await fs.readFile(newRender.template, 'utf-8')

        // Create new pack
        var packRender = new CreatePackDTO;
        packRender.cant = newRender.data.length;
        packRender.email = newRender.email;
        const pack = await this.renderService.createPack(packRender)

        // Iterate r.data
        for (let j = 0; j < newRender.data.length; j++) {
            let element = newRender.data[j]

            // Save the template in temp
            var temp = content;
            var QRs = [];

            // Change the keys to the data in the template 
            for (let i = 0; i < newRender.keys.length; i++) {
                let key: string = newRender.keys[i]
                if (key[0] == '#') {
                    QRs.push({ key: key.replace('#', ''), data: await this.renderService.generateQR(element[i]) })
                }
                else temp = temp.replace('{{' + key + '}}', element[i]);
            }

            //Save the file to local storage and generate it in the database this item
            await this.renderService.generateTicket(QRs, temp, pack.id)
        };


        const data = await this.renderService.getPack(pack.id)
        
        await this.mailService.sendMail(
            newRender.email,
            "Email de X01bet",
            "Gracias por su compra",
            await fs.readFile(`./storage/template/mail.html`, 'utf-8'),
            data.renders.map(item => { return { path: `./storage/temp/${item.filename}.png` } })
        )

        data.renders.forEach(item => {
            // Delete file
            fs.unlink("./storage/temp/" + item.filename + ".png")

            // Delete render item
            this.renderService.deleteRender(item.id)
        });

        // Delete pack in the database
        this.renderService.deletePack(data.id)

        return 'success';
    }
}