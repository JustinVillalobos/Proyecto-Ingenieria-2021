import {Request, Response} from 'express';
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const validators=require("../business/Validators");
const validator=new validators();
const sql = new sqlConnection();
const common=new commonQueries();
const mssql = require('mssql');
"use strict";

class DepartamentoController{
    constructor() {
       
    }
 public async list(req:Request,res:Response){
      	let sexos:any=[];
        sexos= await common.select("sp_departamento_list");
        res.json(sexos);
    }

    public async selectById(req:Request,res:Response){
    	const id=req.query.id;
        
        if(validator.FormatoNumerico(id,10)==false){
             res.json([{Error:"El ID del sexo no es un número"},{"Response":false}]);
        }else{
           let departamento:any=[];
            departamento= await common.selectById(id,"sp_departamento_select_by_id");
            res.json(departamento);
        }
      	
        
    }

     public async delete(req:Request,res:Response){
     	const id=req.query.id;
      	let response:any;

         if(validator.FormatoNumerico(id,10)==false){
             res.json([{"Response":false},{Error:"El ID del departamento no es un número"}]);
        }else{
             response= await common.delete(id,"sp_departamento_delete");
            res.json([{"Response":response}]);
        }
    }

    /*Falta probar para implementar*/
     public async insert(req:Request,res:Response){
     	
     	const descripcion=[req.body.Descripcion];
     	let response:any;
         if(validator.FormatoPalabraSinEspacio(descripcion,15)==false){
             res.json([{"Response":false},{Error:"La descripción del texto no es válido"}]);
         }else{
          	 await sql.connect().then(function(pool:any) {
                    return pool.request()
                    .input("Descripcion", mssql.VarChar, descripcion)
                    .execute("sp_departamento_insertar");
                }).then(function(result:any) {
                    sql.close();
                     response=result.recordset;
                }).catch(function(err:any){
                    res.status(400).json([{text:"Error de la consulta"},{"Response":false}]);
                });
             res.json([{"Response":true}]);
           }
    }

    /*Falta probar para implementar*/
     public async update(req:Request,res:Response){

     	const IdDepartamento=[req.body.IdDepartamento];
     	const descripcion=[req.body.Descripcion];
     	let response:any;
          let errores="";
         let flagId=true;
         let flagDescripcion=true;
          if(validator.FormatoNumerico(IdDepartamento,10)==false){
              errores="El ID es inválido\n";
              flagId=false;
          }
          if(validator.FormatoPalabraSinEspacio(descripcion,15)==false){
              flagDescripcion=false;
              errores+="La descripción del texto no es válido";
          }
          if(flagDescripcion && flagId){
          	 await sql.connect().then(function(pool:any) {
                    return pool.request()
                    .input("IdDepartamento", mssql.Int, IdDepartamento)
                    .input("Descripcion", mssql.VarChar, descripcion)
                    .execute("sp_departamento_modificar");
                }).then(function(result:any) {
                    sql.close();
                     response=result.recordset;
                }).catch(function(err:any){
                   res.status(400).json([{text:"Error de la consulta"},{"Response":false}]);
                });
             res.json([{"Response":true}]);
           }else{
                 res.json([{"Response":false},{Error:errores}]);
           }
    }
 }
export const departamentoController=new DepartamentoController();
