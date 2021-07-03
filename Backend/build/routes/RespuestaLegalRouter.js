"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RespuestaLegalController_1 = require("../controllers/RespuestaLegalController");
class RespuestaLegalRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', RespuestaLegalController_1.respuestaLegalController.list);
        this.router.get('/select_by_id', RespuestaLegalController_1.respuestaLegalController.selectById);
        this.router.get('/delete', RespuestaLegalController_1.respuestaLegalController.delete);
        this.router.post('/update', RespuestaLegalController_1.respuestaLegalController.update);
        this.router.post('/insert', RespuestaLegalController_1.respuestaLegalController.insert);
    }
}
const respuestaLegalRoutes = new RespuestaLegalRoutes();
exports.default = respuestaLegalRoutes.router;
