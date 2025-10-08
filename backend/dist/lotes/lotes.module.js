"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lote_entity_1 = require("./entities/lote.entity");
const lotes_controller_1 = require("./lotes.controller");
const lotes_service_1 = require("./lotes.service");
let LotesModule = class LotesModule {
};
exports.LotesModule = LotesModule;
exports.LotesModule = LotesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([lote_entity_1.Lote])],
        controllers: [lotes_controller_1.LotesController],
        providers: [lotes_service_1.LotesService],
    })
], LotesModule);
//# sourceMappingURL=lotes.module.js.map