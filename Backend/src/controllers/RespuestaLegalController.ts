import {Request, Response} from 'express';
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const validators=require("../business/Validators");
const validator=new validators();
const sql = new sqlConnection();

const common=new commonQueries();
const mssql = require('mssql');
"use strict";

class RespuestaLegalController{
    constructor() {
       
    }
 public async list(req:Request,res:Response){
      	let legal:any=[];
        legal= await common.select("sp_RespuestaLegal_list");
        res.json(legal);
    }

    public async selectById(req:Request,res:Response){

        const id=req.query.id;
        if(validator.FormatoNumerico(id,10)==false){
             res.json([{Error:"El ID de la respuesta legal no es un número"},{"Response":false}]);
        }else{
           let legal:any=[];
            legal= await common.selectById(id,"sp_RespuestaLegal_select_by_id");
            res.json(legal);
        }

    }

     public async delete(req:Request,res:Response){
     	const id=req.query.id;
      	let response:any;
         if(validator.FormatoNumerico(id,10)==false){
             res.json([{"Response":false},{Error:"El ID de la respuesta legal no es un número"}]);
        }else{
             response= await common.delete(id,"sp_RespuestaLegal_delete");
            res.json([{"Response":response}]);
        }
    }

    public async insert(req:Request,res:Response){

        
        const descripcion = [req.body.descripcion];
    
        let response:any;
    
    
          await sql.connect().then(function(pool:any) {
               return pool.request()
    
               .input("Descripcion", mssql.VarChar, descripcion)
    
               .execute("sp_RespuestaLegal_insertar");
           }).then(function(result:any) {
    
               sql.close();
    
                 res.json({"Response":true});
           }).catch(function(err:any){
               console.log(err);
               res.status(400).json([{text:"Error de la consulta"},{"Response":false}]);
           });
    
    
      }
  

     public async update(req:Request,res:Response){

     	const IdRespuesta=[req.body.IdRespuesta];
     	const descripcion=[req.body.Descripcion];
     	let response:any;
          let errores="";
         let flagId=true;
         let flagDescripcion=true;
          if(validator.FormatoNumerico(IdRespuesta,10)==false){
              errores="El ID es inválido\n";
              flagId=false;
          }
          if(validator.FormatoPalabraSinEspacio(descripcion,25)==false){
              flagDescripcion=false;
              errores+="La descripción del texto no es válido";
          }
          if(flagDescripcion && flagId){
          	 await sql.connect().then(function(pool:any) {
                    return pool.request()
                    .input("IdRespuesta", mssql.Int, IdRespuesta)
                    .input("Descripcion", mssql.VarChar, descripcion)
                    .execute("sp_RespuestaLegal_modificar");
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
export const respuestaLegalController=new RespuestaLegalController();
