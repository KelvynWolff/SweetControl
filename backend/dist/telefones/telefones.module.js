"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelefonesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const telefone_entity_1 = require("./entities/telefone.entity");
const telefones_controller_1 = require("./telefones.controller");
const telefones_service_1 = require("./telefones.service");
let TelefonesModule = class TelefonesModule {
};
exports.TelefonesModule = TelefonesModule;
exports.TelefonesModule = TelefonesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([telefone_entity_1.Telefone])],
        controllers: [telefones_controller_1.TelefonesController],
        providers: [telefones_service_1.TelefonesService],
    })
], TelefonesModule);
//# sourceMappingURL=telefones.module.js.map