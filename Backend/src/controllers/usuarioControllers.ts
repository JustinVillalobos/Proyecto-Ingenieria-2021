import {Request, Response} from 'express';
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const sql = new sqlConnection();
const common=new commonQueries();
const mssql = require('mssql');
var CryptoJS = require("crypto-js");
"use strict";
const jwt = require('jsonwebtoken');

const JWT_Secret = 'your_secret_key';
class UsuarioController{
    constructor() {
       
    }

    public async list(req:Request,res:Response){
      	let Usuarios:any=[];
        Usuarios= await common.select("sp_usuario_list");
        res.json(Usuarios);
    }

    public async selectById(req:Request,res:Response){
    	const id=req.query.id;
      	let Usuarios:any=[];
      	console.log(req.query.id);
        Usuarios= await common.selectById(id,"sp_usuario_select_by_id");
        res.json(Usuarios);
    }
    public async selectBySesion(req:Request,res:Response){
        const correoe=req.body.correo;
        const pswe=req.body.password;
         const correo = CryptoJS.AES.decrypt(correoe.trim(), 'secret key 123').toString(CryptoJS.enc.Utf8);
         const psw = CryptoJS.AES.decrypt(pswe.trim(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        let ip=req.body.ip;
        const fecha=new Date();
          let Usuarios:any=[];
          let id=0;
          let response;
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

                }

            }).catch(function(err:any){
              console.log(err);
                  response={text:"Error de la consulta"};
            });
            if(id!=0){
                await sql.connect().then(function(pool:any) {
                    return pool.request()
                    .input("IdUsuario", mssql.Int, id)
                    .input("IpComputadora", mssql.VarChar, ip)
                    .input("FechaSession", mssql.DateTime, fecha)
                    .execute("sp_Session_insert");
                }).then(function(result:any) {
                    sql.close();
                     var token = jwt.sign(req.body, JWT_Secret);
                      res.status(200).json({
                        signed_user: req.body,
                        token: token,
                        "Usuario":Usuarios[0],
                        "Response":true
                      });
                }).catch(function(err:any){
                    console.log(err);

                });

            }else{
                res.json({"Response":false,response});
            }
       
      //  res.json([{"Usuario":Usuarios},{"Response":true}]);
    }
    public async auth(req:Request,res:Response){
        
         var token = jwt.sign(req.body.signed_user, JWT_Secret);
         var tokeninmemorie=req.body.token;
         if(token==tokeninmemorie){
             res.json({"Response":true});
         }else{
              res.json({"Response":false});
         }
    }
    public async selectByCedulaID(req:Request,res:Response){
        const cedula=req.query.cedula;
        const id=req.query.id;
          let Usuarios:any=[];
         await sql.connect().then(function(pool:any) {
                return pool.request()
                 .input("cedula", mssql.Int, cedula)
                 .input("id", mssql.Int, id)
                .execute("sp_usuario_select_by_cedula_id");
            }).then(function(result:any) {
                sql.close();
                Usuarios=result.recordset;
            }).catch(function(err:any){
              console.log(err);
                  Usuarios=[{text:"Error de la consulta"},{"Response":false}];
            });
       res.json([{"Usuario":Usuarios},{"Response":true}]);
    }

     public async delete(req:Request,res:Response){
     	const id=req.query.id;
      	let response:any;
        response= await common.select(id,"sp_usuario_delete");
        res.json(response);
    }

    /*Falta probar para implementar*/
     public async insert(req:Request,res:Response){
     	const cedula=[req.body.cedula];
     	const nombre=[req.body.nombre];
     	const apellidos=[req.body.apellidos];
     	const fechaNacimiento=[req.body.fechaNacimiento];
     	const correo=[req.body.correo];
     	const telefono=[req.body.telefono];
     	const contrasenia=[req.body.contrasenia];
     	const IdDepartamento=[req.body.IdDepartamento];
     	const IdSexo=[req.body.IdSexo];
     	const foto=[req.body.foto];
     	let response:any;
      	 await sql.connect().then(function(pool:any) {
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
            }).then(function(result:any) {
                sql.close();
                 response=result.recordset;
            }).catch(function(err:any){
            	console.log(err);
                res.status(400).json({text:"Error de la consulta"});
            });
         res.json(response);
    }

    /*Falta probar para implementar*/
     public async update(req:Request,res:Response){
     	const idUsuario=[req.body.IdUsuario];
     	const cedula=[req.body.cedula];
     	const nombre=[req.body.nombre];
     	const apellidos=[req.body.apellidos];
     	const fechaNacimiento=[req.body.fechaNacimiento];
     	const correo=[req.body.correo];
     	const telefono=[req.body.telefono];
     	const contrasenia=[req.body.contrasenia];
     	const IdDepartamento=[req.body.IdDepartamento];
     	const IdSexo=[req.body.IdSexo];
     	const foto=[req.body.foto];
     	let response:any;
      	 await sql.connect().then(function(pool:any) {
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
            }).then(function(result:any) {
                sql.close();
                 response=result.recordset;
            }).catch(function(err:any){
                res.status(400).json({text:"Error de la consulta"});
            });
         res.json(response);
    }
 }
export const usuarioController=new UsuarioController();
