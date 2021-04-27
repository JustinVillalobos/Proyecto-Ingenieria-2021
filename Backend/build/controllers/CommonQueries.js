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
const sqlConnection = require("../Config");
const mssql2 = require('mssql');
const sql = new sqlConnection();
"use strict";
module.exports = class CommonQueries {
    delete(parameter, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = true;
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("id", mssql.Int, parameter)
                    .execute(query);
            }).then(function (result) {
                sql.close();
                msg = result.recordset;
            }).catch(function (err) {
                msg = false;
            });
            return msg;
        });
    }
    select(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .execute(query);
            }).then(function (result) {
                sql.close();
                objects = result.recordset;
            }).catch(function (err) {
                objects = { text: "Error de la consulta" };
            });
            return objects;
        });
    }
    selectById(parameter, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            console.log(parameter + "=" + query);
            yield sql.connect().then(function (pool) {
                return pool.request()
                    .input("id", mssql2.Int, parameter)
                    .execute(query);
            }).then(function (result) {
                sql.close();
                objects = result.recordset;
            }).catch(function (err) {
                console.log(err);
                objects = { text: "Error de la consulta" };
            });
            return objects;
        });
    }
};
