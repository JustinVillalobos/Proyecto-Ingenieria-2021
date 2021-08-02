import {Request, Response} from 'express';
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const validators=require("../business/Validators");
const validator=new validators();
const sql = new sqlConnection();
const common=new commonQueries();
const mssql = require('mssql');
"use strict";
class ReportController{
	 public async range(req:Request,res:Response){
	 	let objects:any=[];
	 	const init=req.query.initDate;
	 	const end=req.query.endDate;
           await sql.connect().then(function(pool:any) {
                return pool.request()
                .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                	+" RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept," 
                	+" Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                		+" FROM            Boleta INNER JOIN"
                        +" RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                        +" Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                        +" Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                         +" Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                        +" Sexo ON Usuario.IdSexo = Sexo.IdSexo "
						 +" and Boleta.FechaHora between '"+init+"' and '"+end+"';");
            }).then(function(result:any) {
                sql.close();
                objects=result.recordset;
            }).catch(function(err:any){
              console.log(err);
                  objects=[{text:"Error de la consulta"},{"Response":false}];
            });
          res.json(objects);
	 }
     public async all(req:Request,res:Response){
         let objects:any=[];
       
           await sql.connect().then(function(pool:any) {
                return pool.request()
                .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                    +" RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept," 
                    +" Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                        +" FROM            Boleta INNER JOIN"
                        +" RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                        +" Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                        +" Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                         +" Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                        +" Sexo ON Usuario.IdSexo = Sexo.IdSexo "
                         +";");
            }).then(function(result:any) {
                sql.close();
                objects=result.recordset;
            }).catch(function(err:any){
              console.log(err);
                  objects=[{text:"Error de la consulta"},{"Response":false}];
            });
          res.json(objects);
     }
	  public async department(req:Request,res:Response){
	 	let objects:any=[];
	 	const Id=req.query.IdDepartamento;
           await sql.connect().then(function(pool:any) {
                return pool.request()
                .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                	+" RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept," 
                	+" Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                		+" FROM            Boleta INNER JOIN "
                        +" RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                        +" Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                        +" Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                         +" Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                        +" Sexo ON Usuario.IdSexo = Sexo.IdSexo "
						 +" and Usuario.IdDepartamento="+Id+";");
            }).then(function(result:any) {
                sql.close();
                objects=result.recordset;
            }).catch(function(err:any){
              console.log(err);
                  objects=[{text:"Error de la consulta"},{"Response":false}];
            });
           res.json(objects);
	 }
	  public async user(req:Request,res:Response){
	 	let objects:any=[];
	 	const Id=req.query.IdUsuario;
           await sql.connect().then(function(pool:any) {
                return pool.request()
                .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                	+" RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept," 
                	+" Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                		+" FROM            Boleta INNER JOIN"
                        +" RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                        +" Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                        +" Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                         +" Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                        +" Sexo ON Usuario.IdSexo = Sexo.IdSexo "
						 +" and Usuario.IdUsuario="+Id+";");
            }).then(function(result:any) {
                sql.close();
                objects=result.recordset;
            }).catch(function(err:any){
              console.log(err);
                  objects=[{text:"Error de la consulta"},{"Response":false}];
            });
           res.json(objects);
	 }
	  public async theme(req:Request,res:Response){
	 	let objects:any=[];
	 	const theme=req.query.theme;
           await sql.connect().then(function(pool:any) {
                return pool.request()
                .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                	+" RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept," 
                	+" Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                		+" FROM            Boleta INNER JOIN"
                        +" RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                        +" Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                        +" Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                         +" Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                        +" Sexo ON Usuario.IdSexo = Sexo.IdSexo "
						 +" and Boleta.PalabraClaveConsulta1='"+theme+"';");
            }).then(function(result:any) {
                sql.close();
                objects=result.recordset;
            }).catch(function(err:any){
              console.log(err);
                  objects=[{text:"Error de la consulta"},{"Response":false}];
            });
           res.json(objects);
	 }
	  public async departmentAndDate(req:Request,res:Response){
	 	let objects:any=[];
	 	const IdDepartamento=req.query.IdDepartamento;
	 	const mes=req.query.init;
           await sql.connect().then(function(pool:any) {
                return pool.request()
                .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                	+" RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept," 
                	+" Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                		+" FROM            Boleta INNER JOIN"
                        +" RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                        +" Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                        +" Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                         +" Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                        +" Sexo ON Usuario.IdSexo = Sexo.IdSexo "
						 +" and Usuario.IdDepartamento="+IdDepartamento+" and MONTH(Boleta.FechaHora)="+mes+" ;");
            }).then(function(result:any) {
                sql.close();
                objects=result.recordset;
            }).catch(function(err:any){
              console.log(err);
                  objects=[{text:"Error de la consulta"},{"Response":false}];
            });
           res.json(objects);
	 }
	  public async userandclasificator(req:Request,res:Response){
	 	let objects:any=[];
	 	const id=req.query.IdClasificador;
	 	const usuario=req.query.IdUsuario;
           await sql.connect().then(function(pool:any) {
                return pool.request()
                .query("SELECT        Boleta.IdBoleta, Boleta.PalabraClaveConsulta1, "
                	+" RespuestaLegal.Descripcion AS respuestaLegal, Departamento.Descripcion AS dept," 
                	+" Usuario.Nombre, Usuario.Apellidos, Sexo.Descripcion, Clasificador.Descripcion AS clasificador"
                		+" FROM            Boleta INNER JOIN"
                        +" RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                        +" Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                        +" Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                         +" Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                        +" Sexo ON Usuario.IdSexo = Sexo.IdSexo "
						 +" and Boleta.IdClasificador="+id+" and Usuario.Cedula="+usuario+" ;");
            }).then(function(result:any) {
                sql.close();
                objects=result.recordset;
            }).catch(function(err:any){
              console.log(err);
                  objects=[{text:"Error de la consulta"},{"Response":false}];
            });
          res.json(objects);
	 }
	  public async resume(req:Request,res:Response){
	 	let objects:any=[];
           await sql.connect().then(function(pool:any) {
                return pool.request()
                .query("SELECT       COUNT(MONTH(Boleta.FechaHora)) AS cantidad, Departamento.Descripcion  "
                		+" FROM            Boleta INNER JOIN"
                        +" RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                        +" Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                        +" Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                         +" Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                        +" Sexo ON Usuario.IdSexo = Sexo.IdSexo "
						 +" GROUP BY Departamento.Descripcion;");
            }).then(function(result:any) {
                sql.close();
                objects=result.recordset;
            }).catch(function(err:any){
              console.log(err);
                  objects=[{text:"Error de la consulta"},{"Response":false}];
            });
           res.json(objects);
	 }
	 public async rangeg(req:Request,res:Response){
	 	let objects:any=[];
	 	const init=req.query.initDate;
	 	const end=req.query.endDate;
           await sql.connect().then(function(pool:any) {
                return pool.request()
                .query("SELECT   COUNT(Usuario.idUsuario) AS cantidad, Departamento.Descripcion     "
                		+" FROM            Boleta INNER JOIN"
                        +" RespuestaLegal ON Boleta.IdRespuesta = RespuestaLegal.IdRespuesta INNER JOIN"
                        +" Usuario ON Boleta.IdUsuario = Usuario.idUsuario INNER JOIN"
                        +" Departamento ON Usuario.IdDepartamento = Departamento.IdDepartamento INNER JOIN"
                         +" Clasificador ON Boleta.IdClasificador = Clasificador.IdClasificador INNER JOIN"
                        +" Sexo ON Usuario.IdSexo = Sexo.IdSexo "
						 +" and Boleta.FechaHora between '"+init+"' and '"+end+"'"
						 +" GROUP BY Departamento.Descripcion;");
            }).then(function(result:any) {
                sql.close();
                objects=result.recordset;
            }).catch(function(err:any){
              console.log(err);
                  objects=[{text:"Error de la consulta"},{"Response":false}];
            });
          res.json(objects);
	 }
	  
}
export const reportController=new ReportController();