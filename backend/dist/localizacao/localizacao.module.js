"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizacaoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const localizacao_service_1 = require("./localizacao.service");
const localizacao_controller_1 = require("./localizacao.controller");
const estado_entity_1 = require("./entities/estado.entity");
const cidade_entity_1 = require("./entities/cidade.entity");
const bairro_entity_1 = require("./entities/bairro.entity");
let LocalizacaoModule = class LocalizacaoModule {
};
exports.LocalizacaoModule = LocalizacaoModule;
exports.LocalizacaoModule = LocalizacaoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([estado_entity_1.Estado, cidade_entity_1.Cidade, bairro_entity_1.Bairro])],
        controllers: [localizacao_controller_1.LocalizacaoController],
        providers: [localizacao_service_1.LocalizacaoService],
    })
], LocalizacaoModule);
//# sourceMappingURL=localizacao.module.js.map