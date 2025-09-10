"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mailer_1 = require("@nestjs-modules/mailer");
const email_entity_1 = require("./entities/email.entity");
const emails_controller_1 = require("./emails.controller");
const emails_service_1 = require("./emails.service");
let EmailsModule = class EmailsModule {
};
exports.EmailsModule = EmailsModule;
exports.EmailsModule = EmailsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([email_entity_1.Email]),
            mailer_1.MailerModule.forRoot({
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
        controllers: [emails_controller_1.EmailsController],
        providers: [emails_service_1.EmailsService],
        exports: [emails_service_1.EmailsService],
    })
], EmailsModule);
//# sourceMappingURL=emails.module.js.map