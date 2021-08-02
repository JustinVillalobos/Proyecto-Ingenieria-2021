"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
class ReportRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', reportController_1.reportController.all);
        this.router.get('/range', reportController_1.reportController.range);
        this.router.get('/rangeg', reportController_1.reportController.rangeg);
        this.router.get('/department', reportController_1.reportController.department);
        this.router.get('/user', reportController_1.reportController.user);
        this.router.get('/theme', reportController_1.reportController.theme);
        this.router.get('/departmentAndDate', reportController_1.reportController.departmentAndDate);
        this.router.get('/userandclasificator', reportController_1.reportController.userandclasificator);
        this.router.get('/resume', reportController_1.reportController.resume);
    }
}
const reportRoutes = new ReportRoutes();
exports.default = reportRoutes.router;
