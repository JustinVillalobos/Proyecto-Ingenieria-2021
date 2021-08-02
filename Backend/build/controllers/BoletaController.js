"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boletaController = void 0;
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const sql = new sqlConnection();
const common = new commonQueries();
const mssql = require('mssql');
var CryptoJS = require("crypto-js");
"use strict";
const jwt = require('jsonwebtoken');
const JWT_Secret = 'your_secret_key';
class BoletaController {
    constructor() {
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let boletas = [];
            boletas = yield common.select("sp_boleta_list");
            res.json(boletas);
        });
    }
    list_boleta_detalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let boletas = [];
            boletas = yield common.select("sp_boleta_detalle_list");
            res.json(boletas);
        });
    }
    list_boleta_respuesta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let boletas = [];
            boletas = yield common.select("sp_boleta_respuestaLegal_list");
            res.json(boletas);
        });
    }
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var ruta = req.files["imagen"]["path"].split("\\");
            res.json({ "Response": true, "newName": ruta[2] });
        });
    }
    selectById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let boletas = [];
            console.log(req.query.id);
            boletas = yield common.selectById(id, "sp_boleta_select_by_id");
            res.json(boletas);
        });
    }
    selectBoletaDetalleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let boletas = [];
            console.log(req.query.id);
            boletas = yield common.selectById(id, "sp_boleta_detalle_select_by_Id");
            res.json(boletas);
        });
    }
    selectBoletaRespuestaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let boletas = [];
            console.log(req.query.id);
            boletas = yield common.selectById(id, "sp_boleta_respuestaLegal_select_by_Id");
            res.json(boletas);
        });
    }
    selectBoleta(req, res, fechaHora) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUsuario = [req.body.IdUsuario];
            const palabraClaveConsulta1 = [req.body.PalabraClaveConsulta1];
            const palabraClaveConsulta2 = [req.body.PalabraClaveConsulta2];
            const asuntoDetallado = [req.body.AsuntoDetallado];
            let ipComputadora = [req.body.IpComputadora];
            const cantidadCambios = [req.body.CantidadCambios];
            const idClasificador = [req.body.IdClasificador];
            const idRespuesta = 1;
            let boletas = [];
            let controller = new BoletaController();
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("FechaHora", mssql.DateTime, fechaHora)
                    .input("IdUsuario", mssql.Int, idUsuario)
                    .input("PalabraClaveConsulta1", mssql.VarChar, palabraClaveConsulta1)
                    .input("PalabraClaveConsulta2", mssql.VarChar, palabraClaveConsulta2)
                    .input("AsuntoDetallado", mssql.VarChar, asuntoDetallado)
                    .input("IpComputadora", mssql.VarChar, ipComputadora)
                    .input("CantidadCambios", mssql.TinyInt, cantidadCambios)
                    .input("IdClasificador", mssql.TinyInt, idClasificador)
                    .input("IdRespuesta", mssql.TinyInt, 1)
                    .execute("p_boleta_select");
            }).then(function (result) {
                boletas = result.recordset;
                sql.close();
                controller.insertarDetalle(req, res, boletas[0].IdBoleta);
            }).catch(function (err) {
                res.status(400).json({ text: "Error de la consulta" });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let response;
            response = yield common.select(id, "sp_boleta_delete");
            res.json(response);
        });
    }
    selectByEmpleado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let response;
            response = yield common.selectById(id, "sp_boleta_empleado");
            res.json(response);
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fechaHora = new Date();
            const idUsuario = [req.body.IdUsuario];
            const palabraClaveConsulta1 = [req.body.PalabraClaveConsulta1];
            const palabraClaveConsulta2 = [req.body.PalabraClaveConsulta2];
            const asuntoDetallado = [req.body.AsuntoDetallado];
            let ipComputadora = [req.body.IpComputadora];
            const cantidadCambios = [req.body.CantidadCambios];
            const idClasificador = [req.body.IdClasificador];
            const idRespuesta = 1;
            let response;
            let boletas = [];
            let controller = new BoletaController();
            let id = 0;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("FechaHora", mssql.DateTime, fechaHora)
                    .input("IdUsuario", mssql.Int, idUsuario)
                    .input("PalabraClaveConsulta1", mssql.VarChar, palabraClaveConsulta1)
                    .input("PalabraClaveConsulta2", mssql.VarChar, palabraClaveConsulta2)
                    .input("AsuntoDetallado", mssql.VarChar, asuntoDetallado)
                    .input("IpComputadora", mssql.VarChar, ipComputadora)
                    .input("CantidadCambios", mssql.TinyInt, cantidadCambios)
                    .input("IdClasificador", mssql.TinyInt, idClasificador)
                    .input("IdRespuesta", mssql.TinyInt, idRespuesta)
                    .execute("p_boleta_insertar");
            }).then(function (result) {
                boletas = result.recordset;
                sql.close();
                controller.selectBoleta(req, res, fechaHora);
            }).catch(function (err) {
                console.log(err);
                res.status(400).json({ text: "Error de la consulta" });
            });
        });
    }
    insertarDetalle(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const evidenciaArchivo = [req.body.Detalle.EvidenciaArchivo];
            const detalle = [req.body.Detalle.detalle];
            let response;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("IdBoleta", mssql.Int, id)
                    .input("EvidenciaArchivo", mssql.VarChar, evidenciaArchivo)
                    .input("Detalle", mssql.VarChar, detalle)
                    .execute("p_detalle_insertar");
            }).then(function (result) {
                sql.close();
                res.json({ "Response": true });
            }).catch(function (err) {
                console.log(err);
                res.status(400).json([{ text: "Error de la consulta" }, { "Response": false }]);
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idRespuesta = [req.body.IdRespuesta];
            const idBoleta = [req.body.IdBoleta];
            const detalleRespuesta = [req.body.DetalleRespuesta];
            const fechaHoraRespuesta = new Date();
            const idUsuarioRespuesta = [req.body.IdUsuarioRespuesta];
            let ipComputadoraRespuesta = [req.body.IpComputadoraRespuesta];
            let response;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("IdBoleta", mssql.Int, idBoleta)
                    .input("IdRespuesta", mssql.TinyInt, idRespuesta)
                    .input("DetalleRespuesta", mssql.VarChar, detalleRespuesta)
                    .input("FechaHoraRespuesta", mssql.DateTime, fechaHoraRespuesta)
                    .input("IdUsuarioRespuesta", mssql.Int, idUsuarioRespuesta)
                    .input("IpComputadoraRespuesta", mssql.VarChar, ipComputadoraRespuesta)
                    .execute("sp_boleta_modificar");
            }).then(function (result) {
                sql.close();
                response = result.recordset;
                res.json({ "Response": true });
            }).catch(function (err) {
                console.log(err);
                res.status(400).json({ text: "Error de la consulta" });
            });
            res.json(response);
        });
    }
}
exports.boletaController = new BoletaController();
