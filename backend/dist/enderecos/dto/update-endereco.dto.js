"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEnderecoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_endereco_dto_1 = require("./create-endereco.dto");
class UpdateEnderecoDto extends (0, mapped_types_1.PartialType)(create_endereco_dto_1.CreateEnderecoDto) {
}
exports.UpdateEnderecoDto = UpdateEnderecoDto;
//# sourceMappingURL=update-endereco.dto.js.map