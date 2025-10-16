"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BairrosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bairro_entity_1 = require("./entities/bairro.entity");
const bairros_controller_1 = require("./bairros.controller");
const bairros_service_1 = require("./bairros.service");
let BairrosModule = class BairrosModule {
};
exports.BairrosModule = BairrosModule;
exports.BairrosModule = BairrosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bairro_entity_1.Bairro])],
        controllers: [bairros_controller_1.BairrosController],
        providers: [bairros_service_1.BairrosService],
        exports: [bairros_service_1.BairrosService],
    })
], BairrosModule);
//# sourceMappingURL=bairros.module.js.map