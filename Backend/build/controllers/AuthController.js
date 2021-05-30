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
exports.authController = void 0;
const sqlConnection = require("../Config");
const sql = new sqlConnection();
const mssql = require('mssql');
const encrypterController = require("./EncrypterController");
const encrypter = new encrypterController();
const jwt = require('jsonwebtoken');
const SECRET = require("../key");
const JWT_Secret = SECRET.JWT_Secret;
"use strict";
class AuthController {
    constructor() {
    }
    selectBySesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const correoe = req.body.correo;
            const pswe = req.body.password;
            const correo = encrypter.desEncryptData(correoe);
            const psw = encrypter.desEncryptData(pswe);
            let Usuarios = [];
            let id = 0;
            let response;
            let controller = new AuthController();
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("correo", mssql.VarChar, correo)
                    .input("password", mssql.VarChar, psw)
                    .execute("sp_usuario_select_by_sesion");
            }).then(function (result) {
                Usuarios = result.recordset;
                sql.close();
                if (Usuarios.length > 0) {
                    id = Usuarios[0].idUsuario;
                    controller.saveSession(req, res, id, Usuarios[0]);
                }
            }).catch(function (err) {
                response = { text: "Error de la consulta" };
            });
            if (id == 0) {
                res.json({ "Response": false, response });
            }
        });
    }
    saveSession(req, res, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let ip = req.body.ip;
            const fecha = new Date();
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("IdUsuario", mssql.Int, id)
                    .input("IpComputadora", mssql.VarChar, ip)
                    .input("FechaSession", mssql.DateTime, fecha)
                    .execute("sp_Session_insert");
            }).then(function (result) {
                sql.close();
                let usuario = {
                    "Cedula": data.Cedula,
                    "idUsuario": data.idUsuario
                };
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 15),
                    data: req.body
                }, JWT_Secret);
                res.status(200).json({
                    token: token,
                    "Usuario": usuario,
                    "Response": true
                });
            }).catch(function (err) {
                let response = { text: "Error de la consulta" };
                res.json({ "Response": false, response });
            });
        });
    }
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var token = req.body.token;
            try {
                jwt.verify(token, JWT_Secret, function (err, decoded) {
                    if (err) {
                        res.json({ "Response": false });
                    }
                    else {
                        res.json({ "Response": true });
                    }
                });
            }
            catch (err) {
                res.json({ "Response": false });
            }
        });
    }
}
exports.authController = new AuthController();
