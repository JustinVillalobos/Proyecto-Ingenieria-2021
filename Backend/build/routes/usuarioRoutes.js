"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioControllers_1 = require("../controllers/usuarioControllers");
class usuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usuarioControllers_1.usuarioController.list);
        this.router.get('/select_by_id', usuarioControllers_1.usuarioController.selectById);
        this.router.get('/select_by_sesion', usuarioControllers_1.usuarioController.selectBySesion);
        this.router.get('/select_by_cedula_id', usuarioControllers_1.usuarioController.selectByCedulaID);
        this.router.get('/delete', usuarioControllers_1.usuarioController.delete);
        this.router.post('/update', usuarioControllers_1.usuarioController.update);
        this.router.post('/insert', usuarioControllers_1.usuarioController.insert);
    }
}
const usuario = new usuarioRoutes();
exports.default = usuario.router;
