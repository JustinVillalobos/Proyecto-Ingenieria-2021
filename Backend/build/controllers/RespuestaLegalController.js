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
exports.respuestaLegalController = void 0;
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const validators = require("../business/Validators");
const validator = new validators();
const sql = new sqlConnection();
const common = new commonQueries();
const mssql = require('mssql');
"use strict";
class RespuestaLegalController {
    constructor() {
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let legal = [];
            legal = yield common.select("sp_RespuestaLegal_list");
            res.json(legal);
            console.log(legal);
        });
    }
    selectById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            if (validator.FormatoNumerico(id, 10) == false) {
                res.json([{ Error: "El ID de la respuesta legal no es un número" }, { "Response": false }]);
            }
            else {
                let legal = [];
                legal = yield common.selectById(id, "sp_RespuestaLegal_select_by_id");
                res.json(legal);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let response;
            if (validator.FormatoNumerico(id, 10) == false) {
                res.json([{ "Response": false }, { Error: "El ID de la respuesta legal no es un número" }]);
            }
            else {
                response = yield common.delete(id, "sp_RespuestaLegal_delete");
                res.json([{ "Response": response }]);
            }
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const descripcion = [req.body.descripcion];
            let response;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("Descripcion", mssql.VarChar, descripcion)
                    .execute("sp_RespuestaLegal_insertar");
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
            const IdRespuesta = [req.body.IdRespuesta];
            const descripcion = [req.body.descripcion];
            let response;
            let errores = "";
            let flagId = true;
            let flagDescripcion = true;
            if (validator.FormatoNumerico(IdRespuesta, 10) == false) {
                errores = "El ID es inválido\n";
                flagId = false;
            }
            if (validator.FormatoPalabraConEspacio(descripcion, 25) == false) {
                flagDescripcion = false;
                errores += "La descripción del texto no es válido";
            }
            console.log(errores);
            if (flagDescripcion && flagId) {
                yield sql.connect().then(function (pool) {
                    return pool.request()
                        .input("id", mssql.Int, IdRespuesta)
                        .input("Descripcion", mssql.VarChar, descripcion)
                        .execute("sp_RespuestaLegal_modificar");
                }).then(function (result) {
                    sql.close();
                    response = result.recordset;
                    res.json([{ "Response": true }]);
                }).catch(function (err) {
                    res.status(400).json([{ text: "Error de la consulta" }, { "Response": false }]);
                });
            }
            else {
                res.json([{ "Response": false }, { Error: errores }]);
            }
        });
    }
}
exports.respuestaLegalController = new RespuestaLegalController();
