"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const usuarios_service_1 = require("./usuarios.service");
const usuario_entity_1 = require("./entities/usuario.entity");
describe('UsuariosService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                usuarios_service_1.UsuariosService,
                { provide: (0, typeorm_1.getRepositoryToken)(usuario_entity_1.Usuario), useValue: {} },
            ],
        }).compile();
        service = module.get(usuarios_service_1.UsuariosService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=usuarios.service.spec.js.map