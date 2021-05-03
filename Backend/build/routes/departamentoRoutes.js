"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentoController_1 = require("../controllers/departamentoController");
class DepartamentoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', departamentoController_1.departamentoController.list);
        this.router.get('/select_by_id', departamentoController_1.departamentoController.selectById);
        this.router.get('/delete', departamentoController_1.departamentoController.delete);
        this.router.post('/update', departamentoController_1.departamentoController.update);
        this.router.post('/insert', departamentoController_1.departamentoController.insert);
    }
}
const departamentoRoutes = new DepartamentoRoutes();
exports.default = departamentoRoutes.router;
