"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multipart = require('connect-multiparty');
var fs = require('fs');
var request = require('request');
const multipartMiddleware = multipart({
    uploadDir: './build/uploads'
});
const BoletaController_1 = require("../controllers/BoletaController");
class BoletaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', BoletaController_1.boletaController.list);
        this.router.get('/select_boleta_detalle', BoletaController_1.boletaController.list_boleta_detalle);
        this.router.get('/select_boleta_respuesta', BoletaController_1.boletaController.list_boleta_respuesta);
        this.router.get('/select_by_id', BoletaController_1.boletaController.selectById);
        this.router.get('/select_Boleta_Detalle_by_id', BoletaController_1.boletaController.selectBoletaDetalleById);
        this.router.get('/select_Boleta_Respuesta_by_id', BoletaController_1.boletaController.selectBoletaRespuestaById);
        this.router.post('/update', BoletaController_1.boletaController.update);
        this.router.post('/insert', BoletaController_1.boletaController.insert);
        this.router.post('/upload', multipartMiddleware, BoletaController_1.boletaController.upload);
        this.router.get('/select_by_Empleado', BoletaController_1.boletaController.selectByEmpleado);
        this.router.get('/Imagenes/:img', function (req, res) {
            /*var file = fs.readFileSync(__dirname + '/../uploads/'+req.params["img"], 'binary');
            res.setHeader('Content-Length', file.length);
            res.write(file, 'binary'); res.end();*/
            //  res.sendFile( "../uploads/"+req.params["img"], { root: __dirname } );
            var file = __dirname + '/../uploads/' + req.params["img"];
            res.download(file);
        });
    }
}
const boletaRoutes = new BoletaRoutes();
exports.default = boletaRoutes.router;
