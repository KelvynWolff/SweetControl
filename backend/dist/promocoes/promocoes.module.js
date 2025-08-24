"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromocoesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const promocao_entity_1 = require("./entities/promocao.entity");
const promocoes_controller_1 = require("./promocoes.controller");
const promocoes_service_1 = require("./promocoes.service");
let PromocoesModule = class PromocoesModule {
};
exports.PromocoesModule = PromocoesModule;
exports.PromocoesModule = PromocoesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([promocao_entity_1.Promocao])],
        controllers: [promocoes_controller_1.PromocoesController],
        providers: [promocoes_service_1.PromocoesService],
    })
], PromocoesModule);
//# sourceMappingURL=promocoes.module.js.map