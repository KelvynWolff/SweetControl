"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceitasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const receita_entity_1 = require("./entities/receita.entity");
const receitas_controller_1 = require("./receitas.controller");
const receitas_service_1 = require("./receitas.service");
let ReceitasModule = class ReceitasModule {
};
exports.ReceitasModule = ReceitasModule;
exports.ReceitasModule = ReceitasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([receita_entity_1.Receita])],
        controllers: [receitas_controller_1.ReceitasController],
        providers: [receitas_service_1.ReceitasService],
    })
], ReceitasModule);
//# sourceMappingURL=receitas.module.js.map