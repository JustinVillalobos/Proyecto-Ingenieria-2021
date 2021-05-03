import {Request, Response} from 'express';
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const validators=require("../business/Validators");
const validator=new validators();
const sql = new sqlConnection();

const common=new commonQueries();
const mssql = require('mssql');
"use strict";

class ClasificadorController{
    constructor() {
       
    }
 public async list(req:Request,res:Response){
      	let sexos:any=[];
        sexos= await common.select("sp_clasificador_list");
        res.json(sexos);
    }

    public async selectById(req:Request,res:Response){

        const id=req.query.id;
        if(validator.FormatoNumerico(id,10)==false){
             res.json([{Error:"El ID del clasificador no es un número"},{"Response":false}]);
        }else{
           let clasificadores:any=[];
            clasificadores= await common.selectById(id,"sp_clasificador_select_by_id");
            res.json(clasificadores);
        }

    }

     public async delete(req:Request,res:Response){
     	const id=req.query.id;
      	let response:any;
         if(validator.FormatoNumerico(id,10)==false){
             res.json([{"Response":false},{Error:"El ID del clasificador no es un número"}]);
        }else{
             response= await common.delete(id,"sp_clasificador_delete");
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
                    .execute("sp_clasificador_insertar");
                }).then(function(result:any) {
                    sql.close();
                     response=result.recordset;
                }).catch(function(err:any){
                    console.log(err);
                    res.status(400).json([{"Response":false},{text:"Error de la consulta"}]);
                });
              res.json([{"Response":true}]);
         }
    }

    /*Falta probar para implementar*/
     public async update(req:Request,res:Response){

     	const IdDepartamento=[req.body.IdClasificador];
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
                    .input("IdClasificador", mssql.Int, IdDepartamento)
                    .input("Descripcion", mssql.VarChar, descripcion)
                    .execute("sp_clasificador_modificar");
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
export const clasificadorController=new ClasificadorController();
