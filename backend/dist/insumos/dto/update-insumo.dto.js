"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInsumoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_insumo_dto_1 = require("./create-insumo.dto");
class UpdateInsumoDto extends (0, mapped_types_1.PartialType)(create_insumo_dto_1.CreateInsumoDto) {
}
exports.UpdateInsumoDto = UpdateInsumoDto;
//# sourceMappingURL=update-insumo.dto.js.map