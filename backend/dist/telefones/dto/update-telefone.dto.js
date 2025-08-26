"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTelefoneDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_telefone_dto_1 = require("./create-telefone.dto");
class UpdateTelefoneDto extends (0, mapped_types_1.PartialType)(create_telefone_dto_1.CreateTelefoneDto) {
}
exports.UpdateTelefoneDto = UpdateTelefoneDto;
//# sourceMappingURL=update-telefone.dto.js.map