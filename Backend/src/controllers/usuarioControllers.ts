import {Request, Response} from 'express';
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const sql = new sqlConnection();
const common=new commonQueries();
const mssql = require('mssql');
"use strict";

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
                .input("IdDepartamento", mssql.int, IdDepartamento)
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
                .input("IdDepartamento", mssql.int, IdDepartamento)
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
