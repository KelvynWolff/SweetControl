"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePromocaoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_promocao_dto_1 = require("./create-promocao.dto");
class UpdatePromocaoDto extends (0, mapped_types_1.PartialType)(create_promocao_dto_1.CreatePromocaoDto) {
}
exports.UpdatePromocaoDto = UpdatePromocaoDto;
//# sourceMappingURL=update-promocao.dto.js.map