"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const estado_entity_1 = require("./entities/estado.entity");
const estados_controller_1 = require("./estados.controller");
const estados_service_1 = require("./estados.service");
let EstadosModule = class EstadosModule {
};
exports.EstadosModule = EstadosModule;
exports.EstadosModule = EstadosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([estado_entity_1.Estado])],
        controllers: [estados_controller_1.EstadosController],
        providers: [estados_service_1.EstadosService],
    })
], EstadosModule);
//# sourceMappingURL=estados.module.js.map