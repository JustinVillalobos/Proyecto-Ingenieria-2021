"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', AuthController_1.authController.selectBySesion);
        this.router.post('/auth', AuthController_1.authController.auth);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
