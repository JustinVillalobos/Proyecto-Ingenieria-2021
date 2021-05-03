"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clasificadorController_1 = require("../controllers/clasificadorController");
class ClasificadorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', clasificadorController_1.clasificadorController.list);
        this.router.get('/select_by_id', clasificadorController_1.clasificadorController.selectById);
        this.router.get('/delete', clasificadorController_1.clasificadorController.delete);
        this.router.post('/update', clasificadorController_1.clasificadorController.update);
        this.router.post('/insert', clasificadorController_1.clasificadorController.insert);
    }
}
const clasificadorRoutes = new ClasificadorRoutes();
exports.default = clasificadorRoutes.router;
