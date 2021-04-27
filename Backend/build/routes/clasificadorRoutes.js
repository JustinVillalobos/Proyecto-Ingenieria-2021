"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ClasificadorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
    }
}
const clasificadorRoutes = new ClasificadorRoutes();
exports.default = clasificadorRoutes.router;
