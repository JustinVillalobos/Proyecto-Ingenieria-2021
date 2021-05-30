"use strict";
var CryptoJS = require("crypto-js");
const SECRET = require("../key");
const ENCODE_SECRET = SECRET.ENCODE_SECRET;
module.exports = class EncrypterController {
    constructor() {
    }
    encryptData(data) {
        let code = CryptoJS.AES.encrypt(data, ENCODE_SECRET).toString();
        return code;
    }
    desEncryptData(data) {
        let decode = CryptoJS.AES.decrypt(data, ENCODE_SECRET).toString(CryptoJS.enc.Utf8);
        return decode;
    }
};
