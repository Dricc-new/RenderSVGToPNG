import { Injectable } from '@nestjs/common';
import { Render } from './render.entity';
import { v4 } from 'uuid';
const sharp = require("sharp");
const fs = require('fs');

@Injectable()
export class RenderService {
    createRender(template: string,email: string, keys:[], data:[]){
        const render = {
            email,
            keys,
            data,
        };
        
        fs.readFile(template, 'utf-8', (err, data,r = render) => {
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
                                console.log("error1: "+err)
                            });
                        }
                    });
                });
            }
        });

    }
}
