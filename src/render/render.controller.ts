import { Body, Controller, Post } from '@nestjs/common';
import { RenderService } from './render.service'
import { RenderDTO } from './dto/render.dto';
import { v4 } from 'uuid';
import { CreatePackDTO } from './dto/pack.dto';
import { CreateRenderDTO } from './dto/create-render.dto';
const sharp = require("sharp");
const fs = require('fs/promises');

@Controller('render')
export class RenderController {
    constructor(private renderService: RenderService){}
    
    @Post()
    Renderer(@Body() newRender: RenderDTO){
        fs.readFile(newRender.template, 'utf-8').then((content,r = newRender) => {
            
            // Create new pack
            var packRender = new CreatePackDTO;
            packRender.cant = r.data.length;
            packRender.email = r.email;
            this.renderService.createPack(packRender)
            .then((dat)=>{
                //declaretion filename and temp var
                var filename:string,temp:string;
                
                // Iterate r.data
                r.data.forEach(element => {
                    
                    // Save the template in temp
                    temp = content;
                    
                    // Generate a random filename 
                    filename = v4();
                    
                    // Change the keys to the data in the template 
                    r.keys.forEach( (key,ind)=> {
                        temp = temp.replace('{{'+key+'}}',element[ind]);
                    });
                    
                    //Save the file to local storage and generate it in the database this item
                    fs.writeFile("./storage/temp/"+filename+".svg",temp).
                    then((src = filename) => {
                        return sharp("./storage/temp/"+src+".svg").png().toFile("./storage/temp/"+src+".png")
                    })
                    .then((info,src = filename, packId = dat.id) => {
                        // Load data to render
                        const render = new CreateRenderDTO;
                        render.filename = src;
                        render.packId = packId;

                        return this.renderService.createRender(render);
                    })
                    .then((data,packId = dat.id)=>{
                        return this.renderService.getPack(packId)                        
                    }).then((data) => {
                        // If completed 
                        if(data.renders.length == data.cant){
                            // Send by email

                            //         If it was sent 
                            //             Destroy files
                            //             Destroy items in the database
                            //             Destroy pack in the database
                        }


                    }).catch((err) => {
                        console.log("error: "+err);
                    });
                });
            })
        });
        return 'success';
    }
}