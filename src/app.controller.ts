import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
const os = require('node:os');
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('server-info')
  public getServerInfo() {
    const totalmem = os.totalmem()
    const freemem = os.freemem()
    const usedmem = totalmem - freemem
    const cpus = os.cpus()
    return { totalmem, usedmem, freemem, cpus }
  }
}
