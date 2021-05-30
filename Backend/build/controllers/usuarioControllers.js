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
exports.usuarioController = void 0;
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const sql = new sqlConnection();
const common = new commonQueries();
const mssql = require('mssql');
var CryptoJS = require("crypto-js");
"use strict";
const jwt = require('jsonwebtoken');
const JWT_Secret = 'your_secret_key';
class UsuarioController {
    constructor() {
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Usuarios = [];
            Usuarios = yield common.select("sp_usuario_list");
            res.json(Usuarios);
        });
    }
    selectById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let Usuarios = [];
            console.log(req.query.id);
            Usuarios = yield common.selectById(id, "sp_usuario_select_by_id");
            res.json(Usuarios);
        });
    }
    selectByCedulaID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cedula = req.query.cedula;
            const id = req.query.id;
            let Usuarios = [];
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("cedula", mssql.Int, cedula)
                    .input("id", mssql.Int, id)
                    .execute("sp_usuario_select_by_cedula_id");
            }).then(function (result) {
                sql.close();
                Usuarios = result.recordset;
            }).catch(function (err) {
                console.log(err);
                Usuarios = [{ text: "Error de la consulta" }, { "Response": false }];
            });
            res.json([{ "Usuario": Usuarios }, { "Response": true }]);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let response;
            response = yield common.select(id, "sp_usuario_delete");
            res.json(response);
        });
    }
    /*Falta probar para implementar*/
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cedula = [req.body.cedula];
            const nombre = [req.body.nombre];
            const apellidos = [req.body.apellidos];
            const fechaNacimiento = [req.body.fechaNacimiento];
            const correo = [req.body.correo];
            const telefono = [req.body.telefono];
            const contrasenia = [req.body.contrasenia];
            const IdDepartamento = [req.body.IdDepartamento];
            const IdSexo = [req.body.IdSexo];
            const foto = [req.body.foto];
            let response;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("Cedula", mssql.Int, cedula)
                    .input("Nombre", mssql.VarChar, nombre)
                    .input("Apellidos", mssql.VarChar, apellidos)
                    .input("FechaNacimiento", mssql.DateTime, fechaNacimiento)
                    .input("Correo", mssql.VarChar, correo)
                    .input("IdDepartamento", mssql.Int, IdDepartamento)
                    .input("IdSexo", mssql.Int, IdSexo)
                    .input("Telefono", mssql.VarChar, telefono)
                    .input("Foto", mssql.VarChar, foto)
                    .input("Contrasenia", mssql.VarChar, contrasenia)
                    .execute("sp_usuario_insertar");
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
    /*Falta probar para implementar*/
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUsuario = [req.body.IdUsuario];
            const cedula = [req.body.cedula];
            const nombre = [req.body.nombre];
            const apellidos = [req.body.apellidos];
            const fechaNacimiento = [req.body.fechaNacimiento];
            const correo = [req.body.correo];
            const telefono = [req.body.telefono];
            const contrasenia = [req.body.contrasenia];
            const IdDepartamento = [req.body.IdDepartamento];
            const IdSexo = [req.body.IdSexo];
            const foto = [req.body.foto];
            let response;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("IdUsuario", mssql.Int, idUsuario)
                    .input("Cedula", mssql.Int, cedula)
                    .input("Nombre", mssql.VarChar, nombre)
                    .input("Apellidos", mssql.VarChar, apellidos)
                    .input("FechaNacimiento", mssql.DateTime, fechaNacimiento)
                    .input("Correo", mssql.VarChar, correo)
                    .input("IdDepartamento", mssql.Int, IdDepartamento)
                    .input("IdSexo", mssql.Int, IdSexo)
                    .input("Telefono", mssql.VarChar, telefono)
                    .input("Foto", mssql.VarChar, foto)
                    .input("Contrasenia", mssql.VarChar, contrasenia)
                    .execute("sp_usuario_modificar");
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
exports.usuarioController = new UsuarioController();
