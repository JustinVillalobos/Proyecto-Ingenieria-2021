import {Request, Response} from 'express';
const sqlConnection = require("../Config");
const sql = new sqlConnection();
const mssql = require('mssql');
const encrypterController = require("./EncrypterController");
const encrypter=new encrypterController();
const jwt = require('jsonwebtoken');

const SECRET = require("../key");
const JWT_Secret = SECRET.JWT_Secret;
"use strict";
class AuthController{
    constructor() {
       
    }
    public async selectBySesion(req:Request,res:Response){
        const correoe=req.body.correo;
        const pswe=req.body.password;
         const correo = encrypter.desEncryptData(correoe); 
         const psw = encrypter.desEncryptData(pswe); 
          let Usuarios:any=[];
          let id=0;
          let response;
          let controller=new AuthController();
         await sql.connect().then(function(pool:any) {
                return pool.request()
                 .input("correo", mssql.VarChar, correo)
                 .input("password", mssql.VarChar, psw)
                .execute("sp_usuario_select_by_sesion");
            }).then(function(result:any) {       
                Usuarios=result.recordset;
                 sql.close();
                if(Usuarios.length>0){
                    id=Usuarios[0].idUsuario;
                    controller.saveSession(req,res,id,Usuarios[0]);
                }

            }).catch(function(err:any){
                  response={text:"Error de la consulta"};
            });
            if(id==0){
                res.json({"Response":false,response});
            }
    }
    public async saveSession(req:Request,res:Response,id:number,data:any){
         let ip=req.body.ip;
        const fecha=new Date();

         await sql.connect().then(function(pool:any) {
                    return pool.request()
                    .input("IdUsuario", mssql.Int, id)
                    .input("IpComputadora", mssql.VarChar, ip)
                    .input("FechaSession", mssql.DateTime, fecha)
                    .execute("sp_Session_insert");
                }).then(function(result:any) {
                    sql.close();
                           let usuario={
					        	"Cedula":data.Cedula,
					        	"idUsuario":data.idUsuario
					        }
					                      var token = jwt.sign({
                      	exp: Math.floor(Date.now() / 1000) + (60 * 15),
                      	data:req.body}, JWT_Secret);
                      res.status(200).json({
                        token: token,
                        "Usuario":usuario,
                        "Response":true
                      });
                }).catch(function(err:any){
                	let  response={text:"Error de la consulta"};
                     res.json({"Response":false,response});

            });

    }
    public async auth(req:Request,res:Response){
         var token=req.body.token;
         try {
          jwt.verify(token, JWT_Secret, function(err:Error, decoded:any) {
              if(err){
                  res.json({"Response":false});
              }else{
                  res.json({"Response":true});
              }
                
            });
        } catch(err) {
           res.json({"Response":false});
        }
         
    }

}
export const authController=new AuthController();
