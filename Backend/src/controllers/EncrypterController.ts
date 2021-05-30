var CryptoJS = require("crypto-js");
const SECRET = require("../key");
const ENCODE_SECRET = SECRET.ENCODE_SECRET;
module.exports=class EncrypterController{
    constructor() {
       
    }
    public  encryptData(data:string){
    	let code=CryptoJS.AES.encrypt(data, ENCODE_SECRET).toString();
    	return  code;
    }
    public  desEncryptData(data:string){
    	let decode=CryptoJS.AES.decrypt(data, ENCODE_SECRET).toString(CryptoJS.enc.Utf8);
    	return decode;
    }
}
