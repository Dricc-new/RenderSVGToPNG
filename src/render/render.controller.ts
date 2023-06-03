import { Body, Controller, Post } from '@nestjs/common';
import { RenderService } from './render.service'
import { RenderDTO } from './dto/render.dto';
import { v4 } from 'uuid';
import { CreatePackageDTO } from './dto/package.dto';
import { CreateRenderDTO } from './dto/create-render.dto';
const sharp = require("sharp");
const fs = require('fs');

@Controller('render')
export class RenderController {
    constructor(private renderService: RenderService){}
    
    @Post()
    Renderer(@Body() newRender: RenderDTO){
        fs.readFile(newRender.template, 'utf-8', (err, content,r = newRender) => {
            if(!err) {
                // Create new package
                var packageRender = new CreatePackageDTO;
                packageRender.cant = r.data.length;
                packageRender.email = r.email;
                console.log(this.renderService.createPackage(packageRender));
                
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
                    fs.writeFile("./storage/temp/"+filename+".svg",temp,function(err,src = filename){
                        if (!err) { 

                            // Convert file svg to file png 
                            sharp("./storage/temp/"+src+".svg").png().toFile("./storage/temp/"+src+".png").then(function(info,file = src) {
                                // const render = new CreateRenderDTO;
                                // render.filename
                                // this.renderService.createRender();
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
