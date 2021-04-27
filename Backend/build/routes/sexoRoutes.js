"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class SexoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
    }
}
const sexoRoutes = new SexoRoutes();
exports.default = sexoRoutes.router;
