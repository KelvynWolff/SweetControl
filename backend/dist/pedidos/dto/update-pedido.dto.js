"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePedidoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pedido_dto_1 = require("./create-pedido.dto");
class UpdatePedidoDto extends (0, mapped_types_1.PartialType)(create_pedido_dto_1.CreatePedidoDto) {
}
exports.UpdatePedidoDto = UpdatePedidoDto;
//# sourceMappingURL=update-pedido.dto.js.map