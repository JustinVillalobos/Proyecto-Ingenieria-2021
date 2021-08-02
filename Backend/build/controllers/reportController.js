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
exports.reportController = void 0;
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const validators = require("../business/Validators");
const validator = new validators();
const sql = new sqlConnection();
const common = new commonQueries();
const mssql = require('mssql');
"use strict";
class ReportController {
    range(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            const init = req.query.initDate;
            const end = req.query.endDate;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                    + " RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept,"
                    + " Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                    + " FROM            Boleta INNER JOIN"
                    + " RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                    + " Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                    + " Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                    + " Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                    + " Sexo ON Usuario.IdSexo = Sexo.IdSexo "
                    + " and Boleta.FechaHora between '" + init + "' and '" + end + "';");
            }).then(function (result) {
                sql.close();
                objects = result.recordset;
            }).catch(function (err) {
                console.log(err);
                objects = [{ text: "Error de la consulta" }, { "Response": false }];
            });
            res.json(objects);
        });
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                    + " RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept,"
                    + " Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                    + " FROM            Boleta INNER JOIN"
                    + " RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                    + " Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                    + " Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                    + " Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                    + " Sexo ON Usuario.IdSexo = Sexo.IdSexo "
                    + ";");
            }).then(function (result) {
                sql.close();
                objects = result.recordset;
            }).catch(function (err) {
                console.log(err);
                objects = [{ text: "Error de la consulta" }, { "Response": false }];
            });
            res.json(objects);
        });
    }
    department(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            const Id = req.query.IdDepartamento;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                    + " RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept,"
                    + " Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                    + " FROM            Boleta INNER JOIN "
                    + " RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                    + " Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                    + " Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                    + " Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                    + " Sexo ON Usuario.IdSexo = Sexo.IdSexo "
                    + " and Usuario.IdDepartamento=" + Id + ";");
            }).then(function (result) {
                sql.close();
                objects = result.recordset;
            }).catch(function (err) {
                console.log(err);
                objects = [{ text: "Error de la consulta" }, { "Response": false }];
            });
            res.json(objects);
        });
    }
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            const Id = req.query.IdUsuario;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                    + " RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept,"
                    + " Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                    + " FROM            Boleta INNER JOIN"
                    + " RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                    + " Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                    + " Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                    + " Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                    + " Sexo ON Usuario.IdSexo = Sexo.IdSexo "
                    + " and Usuario.IdUsuario=" + Id + ";");
            }).then(function (result) {
                sql.close();
                objects = result.recordset;
            }).catch(function (err) {
                console.log(err);
                objects = [{ text: "Error de la consulta" }, { "Response": false }];
            });
            res.json(objects);
        });
    }
    theme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            const theme = req.query.theme;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                    + " RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept,"
                    + " Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                    + " FROM            Boleta INNER JOIN"
                    + " RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                    + " Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                    + " Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                    + " Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                    + " Sexo ON Usuario.IdSexo = Sexo.IdSexo "
                    + " and Boleta.PalabraClaveConsulta1='" + theme + "';");
            }).then(function (result) {
                sql.close();
                objects = result.recordset;
            }).catch(function (err) {
                console.log(err);
                objects = [{ text: "Error de la consulta" }, { "Response": false }];
            });
            res.json(objects);
        });
    }
    departmentAndDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            const IdDepartamento = req.query.IdDepartamento;
            const mes = req.query.init;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                    + " RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept,"
                    + " Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                    + " FROM            Boleta INNER JOIN"
                    + " RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                    + " Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                    + " Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                    + " Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                    + " Sexo ON Usuario.IdSexo = Sexo.IdSexo "
                    + " and Usuario.IdDepartamento=" + IdDepartamento + " and MONTH(Boleta.FechaHora)=" + mes + " ;");
            }).then(function (result) {
                sql.close();
                objects = result.recordset;
            }).catch(function (err) {
                console.log(err);
                objects = [{ text: "Error de la consulta" }, { "Response": false }];
            });
            res.json(objects);
        });
    }
    userandclasificator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            const id = req.query.IdClasificador;
            const usuario = req.query.IdUsuario;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                    + " RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept,"
                    + " Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                    + " FROM            Boleta INNER JOIN"
                    + " RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                    + " Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                    + " Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                    + " Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                    + " Sexo ON Usuario.IdSexo = Sexo.IdSexo "
                    + " and Boleta.IdClasificador=" + id + " and Usuario.Cedula=" + usuario + " ;");
            }).then(function (result) {
                sql.close();
                objects = result.recordset;
            }).catch(function (err) {
                console.log(err);
                objects = [{ text: "Error de la consulta" }, { "Response": false }];
            });
            res.json(objects);
        });
    }
    resume(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .query("SELECT       COUNT(MONTH(Boleta.FechaHora)) AS cantidad, Departamento.Descripcion  "
                    + " FROM            Boleta INNER JOIN"
                    + " RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                    + " Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                    + " Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                    + " Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                    + " Sexo ON Usuario.IdSexo = Sexo.IdSexo "
                    + " GROUP BY Departamento.Descripcion;");
            }).then(function (result) {
                sql.close();
                objects = result.recordset;
            }).catch(function (err) {
                console.log(err);
                objects = [{ text: "Error de la consulta" }, { "Response": false }];
            });
            res.json(objects);
        });
    }
    rangeg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            const init = req.query.initDate;
            const end = req.query.endDate;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .query("SELECT   COUNT(Usuario.idUsuario) AS cantidad, Departamento.Descripcion     "
                    + " FROM            Boleta INNER JOIN"
                    + " RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                    + " Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                    + " Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                    + " Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                    + " Sexo ON Usuario.IdSexo = Sexo.IdSexo "
                    + " and Boleta.FechaHora between '" + init + "' and '" + end + "'"
                    + " GROUP BY Departamento.Descripcion;");
            }).then(function (result) {
                sql.close();
                objects = result.recordset;
            }).catch(function (err) {
                console.log(err);
                objects = [{ text: "Error de la consulta" }, { "Response": false }];
            });
            res.json(objects);
        });
    }
}
exports.reportController = new ReportController();
