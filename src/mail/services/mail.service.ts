import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
    constructor(private readonly configService: ConfigService) { }

    private readonly transporter = nodemailer.createTransport({
        host: this.configService.get('MAIL_HOST'),
        port: this.configService.get('MAIL_PORT'),
        auth: {
            user: this.configService.get('MAIL_USER'),
            pass: this.configService.get('MAIL_PASSWORD')
        }
    });

    sendMail(to: string, subject: string, text: string, html: string, attachments: Array<any>) {
        return this.transporter.sendMail({
            from: this.configService.get('MAIL_USER'), to, subject, text, html, attachments
        });
    }
}
