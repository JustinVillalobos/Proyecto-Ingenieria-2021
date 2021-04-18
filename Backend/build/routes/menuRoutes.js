"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menuControllers_1 = require("../controllers/menuControllers");
class menuRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', menuControllers_1.menuControllers.list);
        this.router.get('/:id', menuControllers_1.menuControllers.getParameters);
        this.router.post('/', menuControllers_1.menuControllers.create);
        this.router.post('/Image', menuControllers_1.menuControllers.image);
        this.router.get('/Filtro/:clave', menuControllers_1.menuControllers.getUnoByClave);
        this.router.delete('/:id', menuControllers_1.menuControllers.delete);
        this.router.put('/:id', menuControllers_1.menuControllers.update);
    }
}
const menu = new menuRoutes();
exports.default = menu.router;
