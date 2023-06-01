import { Body, Controller, Post } from '@nestjs/common';
import { RenderService } from './render.service'
import { RenderDTO } from './dto/render.dto';
import { v4 } from 'uuid';
const sharp = require("sharp");
const fs = require('fs');

@Controller('render')
export class RenderController {
    constructor(private renderService: RenderService){}
    
    @Post()
    Renderer(@Body() newRender: RenderDTO){
        fs.readFile(newRender.template, 'utf-8', (err, data,r = newRender) => {
            if(!err) {
                var filename:string,temp:string;
                r.data.forEach(element => {
                    temp = data;
                    filename = v4();
                    r.keys.forEach( (key,ind)=> {
                        temp = temp.replace('{{'+key+'}}',element[ind]);
                    });
                    fs.writeFile("./storage/temp/"+filename+".svg",temp,function(err,src = filename){
                        if (!err) { 
                            sharp("./storage/temp/"+src+".svg").png().toFile("./storage/temp/"+src+".png").then(function(info,file = src) {
                                console.log(file);
                            }).catch(function(err) {
                                console.log("error1: "+err);
                            });
                        }
                    });
                });
            }
        });
        return 'success';
    }
}
