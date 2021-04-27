"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class DepartamentoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
    }
}
const departamentoRoutes = new DepartamentoRoutes();
exports.default = departamentoRoutes.router;
