"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sexoController_1 = require("../controllers/sexoController");
class SexoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', sexoController_1.sexoController.list);
        this.router.get('/select_by_id', sexoController_1.sexoController.selectById);
        this.router.get('/delete', sexoController_1.sexoController.delete);
        this.router.post('/update', sexoController_1.sexoController.update);
        this.router.post('/insert', sexoController_1.sexoController.insert);
    }
}
const sexoRoutes = new SexoRoutes();
exports.default = sexoRoutes.router;
