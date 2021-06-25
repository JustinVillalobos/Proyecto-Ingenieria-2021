"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BoletaController_1 = require("../controllers/BoletaController");
class BoletaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', BoletaController_1.boletaController.list);
        this.router.get('/select_by_id', BoletaController_1.boletaController.selectById);
        this.router.post('/update', BoletaController_1.boletaController.update);
        this.router.post('/insert', BoletaController_1.boletaController.insert);
    }
}
const boletaRoutes = new BoletaRoutes();
exports.default = boletaRoutes.router;
