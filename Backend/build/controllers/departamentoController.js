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
exports.departamentoController = void 0;
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const validators = require("../business/Validators");
const validator = new validators();
const sql = new sqlConnection();
const common = new commonQueries();
const mssql = require('mssql');
"use strict";
class DepartamentoController {
    constructor() {
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sexos = [];
            sexos = yield common.select("sp_departamento_list");
            res.json(sexos);
        });
    }
    selectById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            if (validator.FormatoNumerico(id, 10) == false) {
                res.json([{ Error: "El ID del sexo no es un número" }, { "Response": false }]);
            }
            else {
                let departamento = [];
                departamento = yield common.selectById(id, "sp_departamento_select_by_id");
                res.json(departamento);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let response;
            if (validator.FormatoNumerico(id, 10) == false) {
                res.json([{ "Response": false }, { Error: "El ID del departamento no es un número" }]);
            }
            else {
                response = yield common.delete(id, "sp_departamento_delete");
                res.json([{ "Response": response }]);
            }
        });
    }
    /*Falta probar para implementar*/
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const descripcion = [req.body.Descripcion];
            let response;
            if (validator.FormatoPalabraSinEspacio(descripcion, 15) == false) {
                res.json([{ "Response": false }, { Error: "La descripción del texto no es válido" }]);
            }
            else {
                yield sql.connect().then(function (pool) {
                    return pool.request()
                        .input("Descripcion", mssql.VarChar, descripcion)
                        .execute("sp_departamento_insertar");
                }).then(function (result) {
                    sql.close();
                    response = result.recordset;
                }).catch(function (err) {
                    res.status(400).json([{ text: "Error de la consulta" }, { "Response": false }]);
                });
                res.json([{ "Response": true }]);
            }
        });
    }
    /*Falta probar para implementar*/
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const IdDepartamento = [req.body.IdDepartamento];
            const descripcion = [req.body.Descripcion];
            let response;
            let errores = "";
            let flagId = true;
            let flagDescripcion = true;
            if (validator.FormatoNumerico(IdDepartamento, 10) == false) {
                errores = "El ID es inválido\n";
                flagId = false;
            }
            if (validator.FormatoPalabraSinEspacio(descripcion, 15) == false) {
                flagDescripcion = false;
                errores += "La descripción del texto no es válido";
            }
            if (flagDescripcion && flagId) {
                yield sql.connect().then(function (pool) {
                    return pool.request()
                        .input("IdDepartamento", mssql.Int, IdDepartamento)
                        .input("Descripcion", mssql.VarChar, descripcion)
                        .execute("sp_departamento_modificar");
                }).then(function (result) {
                    sql.close();
                    response = result.recordset;
                }).catch(function (err) {
                    res.status(400).json([{ text: "Error de la consulta" }, { "Response": false }]);
                });
                res.json([{ "Response": true }]);
            }
            else {
                res.json([{ "Response": false }, { Error: errores }]);
            }
        });
    }
}
exports.departamentoController = new DepartamentoController();
