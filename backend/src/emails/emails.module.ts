import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { Email } from './entities/email.entity';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { Notificacao } from '../notificacoes/entities/notificacao.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Email, Notificacao]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: 'jerrold.upton@ethereal.email',
          pass: 'kMKTDjVkmHF7ceXAQW',
        },
      },
    }),
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}