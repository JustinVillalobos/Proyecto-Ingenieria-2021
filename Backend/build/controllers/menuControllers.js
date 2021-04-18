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
exports.menuControllers = void 0;
var soap = require('soap');
var url = 'http://localhost:8080/Restaurante/MenuService?wsdl';
var args = { name: 'value' };
class menuController {
    //    http://localhost:8084/WebAppRestaurante/MenuService?wsdl
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            soap.createClient(url, function (err, client) {
                if (err)
                    console.error(err);
                else {
                    client.getmenus(args, function (err, response, request) {
                        if (err)
                            console.error(err);
                        else {
                            console.log(response);
                            res.json(response);
                        }
                    });
                }
            });
        });
    }
    getParameters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { id } = req.params;
            console.log({ id });
            soap.createClient(url, function (err, client) {
                if (err)
                    console.error(err);
                else {
                    //cambiar metodo
                    client.ParametrosModificarMenu({ parameter: [id] }, function (err, response, request) {
                        if (err)
                            console.error(err);
                        else {
                            res.json(response);
                        }
                    });
                }
            });
        });
    }
    image(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Hey");
            console.log(req.body);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            var menu = req.body;
            soap.createClient(url, function (err, client) {
                if (err)
                    console.error(err);
                else {
                    client.insertarMenu({ menu: [menu] }, function (err, response, request) {
                        if (err)
                            console.error(err);
                        else {
                            console.log(response);
                            if (JSON.stringify(response) == "true") {
                                res.json({ message: 'true' });
                            }
                            else {
                                res.json({ message: 'false' });
                            }
                        }
                    });
                }
            });
        });
    }
    getUnoByClave(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clave } = req.params;
            console.log(req.params.clave);
            var menu = [];
            console.log("Filtro:" + clave);
            soap.createClient(url, function (err, client) {
                if (err)
                    console.error(err);
                else {
                    client.getMenuByClave({ clave: [clave] }, function (err, response, request) {
                        if (err)
                            console.error(err);
                        else {
                            res.json(response);
                        }
                    });
                }
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log("Codigo platillo:" + [id]);
            soap.createClient(url, function (err, client) {
                if (err)
                    console.error(err);
                else {
                    client.deleteMenu({ codigoPlatillo: [id] }, function (err, response, request) {
                        if (err)
                            console.error(err);
                        else {
                            console.log(JSON.stringify(response));
                            if (JSON.stringify(response) == '{"return":true}') {
                                console.log(" Hola, la respuesta es true");
                                res.json({ message: 'true' });
                            }
                            else {
                                console.log(" Hola, la respuesta es false");
                                res.json({ message: 'false' });
                            }
                        }
                    });
                }
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Parametros:" + [req.params.id]);
            const menu = req.body;
            console.log(menu);
            soap.createClient(url, function (err, client) {
                if (err)
                    console.error(err);
                else {
                    client.modifyMenu({ menu: [menu] }, function (err, response, request) {
                        if (err)
                            console.error(err);
                        else {
                            console.log(response);
                            if (JSON.stringify(response) == '{"return":true}') {
                                res.json({ message: 'true' });
                            }
                            else {
                                res.json({ message: 'false' });
                            }
                        }
                    });
                }
            });
        });
    }
}
exports.menuControllers = new menuController();
