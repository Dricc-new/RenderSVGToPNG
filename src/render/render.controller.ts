import { Body, Controller, Post } from '@nestjs/common';
import { RenderService } from './render.service'
import { RenderDTO } from './dto/render.dto';
import { v4 } from 'uuid';
import { CreatePackDTO } from './dto/pack.dto';
import { CreateRenderDTO } from './dto/create-render.dto';
const sharp = require("sharp");
const fs = require('fs/promises');
const nodemailer = require('nodemailer');
const QRMaker = require("qrcode");

async function GenerateQR(key: string, value: string){
    return {key:key,data: await QRMaker.toDataURL(value)};
}

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
                var count = 0;
                // Iterate r.data
                r.data.forEach(element => {
                    
                    // Save the template in temp
                    var temp = content;
                    
                    // Generate a random filename 
                    const filename = v4();
                    
                    var QRs = [];
                    // Change the keys to the data in the template 
                    r.keys.forEach(( key: string, ind)=> {
                        if(key[0] == '#'){
                            QRs.push(GenerateQR(key.replace('#',''),element[ind]))
                        }
                        else temp = temp.replace('{{'+key+'}}',element[ind]);
                    });
                    
                    //Save the file to local storage and generate it in the database this item
                    
                    Promise.all(QRs).then((values)=>{
                        values.forEach(( item)=> {
                            temp = temp.replace('{{'+item.key+'}}',item.data);
                        });
                        return fs.writeFile("./storage/temp/"+filename+".svg",temp)
                    }).then((src = filename) => {

                        // Convert SVG file to PNG file
                        return sharp("./storage/temp/"+src+".svg").png().toFile("./storage/temp/"+src+".png")
                    }).then((info,src = filename) => {
                        
                        // Delete SVG file
                        return fs.unlink("storage/temp/"+src+".svg")
                    }).then((src = filename, packId = dat.id) => {
                        
                        // Load data to render
                        const render = new CreateRenderDTO;
                        render.filename = src;
                        render.packId = packId;  
                        return this.renderService.createRender(render);
                    }).then((data: any,pack = dat)=>{

                        if(!(++count == pack.cant)) throw new Error('next')
                        return this.renderService.getPack(pack.id)                        
                    }).then((data: any) => {

                        //Generate Attachments
                        var attachments = [];
                        data.renders.forEach(element => {
                            attachments.push({path: "./storage/temp/"+element.filename+".png"})
                        });

                        // Send by email
                        const transporter = nodemailer.createTransport({
                            host: "sandbox.smtp.mailtrap.io",
                            port: 2525,
                            auth: {
                              user: "5bad6ebe8b94cd",
                              pass: "cf5036229da671"
                            }
                        });
                        
                        return transporter.sendMail({
                            from: '"Fred Foo" <foo@example.com>', // sender address
                            to: "bar@example.com, baz@example.com", // list of receivers
                            subject: "Hello ✔", // Subject line
                            text: "Hello world?", // plain text body
                            html: "<b>Hello world?</b>", // html body
                            attachments: attachments
                        });
                    
                    }).then((data: any,id = dat.id)=>{
                        return this.renderService.getPack(id)  
                    }).then((data: any)=>{
                        data.renders.forEach(element => {
                            // Delete file
                            fs.unlink("./storage/temp/"+element.filename+".png")
                            
                            // Delete render item
                            this.renderService.deleteRender(element.id)
                        });
                        
                        // Delete pack in the database
                        this.renderService.deletePack(data.id)
                        
                    }).catch((err) => {
                        console.log("error: "+err);
                    });
                });
            })
        });
        return 'success';
    }
}