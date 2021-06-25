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
    selectById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let boletas = [];
            console.log(req.query.id);
            boletas = yield common.selectById(id, "sp_boleta_select_by_id");
            res.json(boletas);
        });
    }
    selectBoleta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fechaHora = req.query.fechaHora;
            const idUsuario = req.query.idUsuario;
            const palabraClaveConsulta1 = req.query.palabraClaveConsulta1;
            const palabraClaveConsulta2 = req.query.palabraClaveConsulta2;
            const asuntoDetallado = req.query.asuntoDetallado;
            let ipComputadora = req.query.ipComputadora;
            const cantidadCambios = req.query.cantidadCambios;
            const idClasificador = req.query.idClasificador;
            let boletas = [];
            console.log(req.query.id);
            boletas = yield common.selectById(fechaHora, idUsuario, palabraClaveConsulta1, palabraClaveConsulta2, asuntoDetallado, ipComputadora, cantidadCambios, idClasificador, "sp_boleta_select");
            res.json(boletas);
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
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fechaHora = new Date();
            const idUsuario = [req.body.idUsuario];
            const palabraClaveConsulta1 = [req.body.palabraClaveConsulta1];
            const palabraClaveConsulta2 = [req.body.palabraClaveConsulta2];
            const asuntoDetallado = [req.body.asuntoDetallado];
            let ipComputadora = [req.body.ipComputadora];
            const cantidadCambios = [req.body.cantidadCambios];
            const idClasificador = [req.body.idClasificador];
            const idRespuesta = [req.body.idRespuesta];
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
                    .input("CantidadCambios", mssql.Tinyint, cantidadCambios)
                    .input("IdClasificador", mssql.Tinyint, idClasificador)
                    .input("IdRespuesta", mssql.Tinyint, idRespuesta)
                    .execute("sp_boleta_insertar");
            }).then(function (result) {
                boletas = result.recordset;
                sql.close();
                if (boletas.length > 0) {
                    id = boletas[0].idBoleta;
                    controller.insertarDetalle(req, res, id, boletas[0]);
                }
            }).catch(function (err) {
                console.log(err);
                res.status(400).json({ text: "Error de la consulta" });
            });
            res.json(response);
        });
    }
    insertarDetalle(req, res, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const evidenciaArchivo = [req.body.evidenciaArchivo];
            const detalle = [req.body.detalle];
            let response;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("IdBoleta", mssql.Int, id)
                    .input("EvidenciaArchivo", mssql.VarChar, evidenciaArchivo)
                    .input("Detalle", mssql.VarChar, detalle)
                    .execute("sp_detalle_insertar");
            }).then(function (result) {
                sql.close();
                response = result.recordset;
            }).catch(function (err) {
                console.log(err);
                res.status(400).json({ text: "Error de la consulta" });
            });
            res.json(response);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idRespuesta = [req.body.idRespuesta];
            const idBoleta = [req.body.idBoleta];
            const detalleRespuesta = [req.body.detalleRespuesta];
            const fechaHoraRespuesta = [req.body.fechaHoraRespuesta];
            const idUsuarioRespuesta = [req.body.idUsuarioRespuesta];
            let ipComputadoraRespuesta = [req.body.ipComputadoraRespuesta];
            let response;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("IdBoleta", mssql.Int, idBoleta)
                    .input("IdRespuesta", mssql.Tinyint, idRespuesta)
                    .input("DetalleRespuesta", mssql.VarChar, detalleRespuesta)
                    .input("FechaHoraRespuesta", mssql.DateTime, fechaHoraRespuesta)
                    .input("IdUsuarioRespuesta", mssql.Int, idUsuarioRespuesta)
                    .input("IpComputadoraRespuesta", mssql.VarChar, ipComputadoraRespuesta)
                    .execute("sp_boleta_modificar");
            }).then(function (result) {
                sql.close();
                response = result.recordset;
            }).catch(function (err) {
                res.status(400).json({ text: "Error de la consulta" });
            });
            res.json(response);
        });
    }
}
exports.boletaController = new BoletaController();
