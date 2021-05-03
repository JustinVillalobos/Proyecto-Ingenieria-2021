import {Request, Response} from 'express';
const sqlConnection = require("../Config");
const commonQueries = require("./CommonQueries");
const validators=require("../business/Validators");
const sql = new sqlConnection();
const validator=new validators();
const common=new commonQueries();
const mssql = require('mssql');


class SexoController{
    constructor() {
       
    }
 public async list(req:Request,res:Response){
      	let sexos:any=[];
        sexos= await common.select("sp_sexo_list");
        res.json(sexos);
    }

    public async selectById(req:Request,res:Response){
    	const id=req.query.id;
        if(validator.FormatoNumerico(id,10)==false){
             res.json([{Error:"El ID del sexo no es un número"},{"Response":false}]);
        }else{
      	 let sexos:any=[];
            sexos= await common.selectById(id,"sp_departamento_select_by_id");
            res.json(sexos);
        }
    }

     public async delete(req:Request,res:Response){
     	const id=req.query.id;
      	let response:any;
         if(validator.FormatoNumerico(id,10)==false){
             res.json([{"Response":false},{Error:"El ID del sexo no es un número"}]);
        }else{
             response= await common.delete(id,"sp_sexo_delete");
            res.json([{"Response":response}]);
        }
       
    }

   
     public async insert(req:Request,res:Response){
         const descripcion=[req.body.Descripcion];
     	let response:any;
         if(validator.FormatoPalabraSinEspacio(descripcion,15)==false){
             res.json([{"Response":false},{Error:"La descripción del texto no es válido"}]);
         }else{
             await sql.connect().then(function(pool:any) {
                return pool.request()
                .input("Descripcion", mssql.VarChar(15), descripcion)
                .execute("sp_sexo_insertar");
            }).then(function(result:any) {
                sql.close();
                 response=result.recordset;
            }).catch(function(err:any){
                res.status(400).json([{"Response":false},{text:"Error de la consulta"}]);
            });
          res.json([{"Response":true}]);
         }
      	 
    }

   
     public async update(req:Request,res:Response){

     	const IdSexo=[req.body.IdSexo];
     	const descripcion=[req.body.Descripcion];
     	let response:any;
         let errores="";
         let flagId=true;
         let flagDescripcion=true;
          if(validator.FormatoNumerico(IdSexo,10)==false){
              errores="El ID es inválido\n";
              flagId=false;
          }
          if(validator.FormatoPalabraSinEspacio(descripcion,15)==false){
              flagDescripcion=false;
              errores+="La descripción del texto no es válido";
          }
          if(flagDescripcion && flagId){
               await sql.connect().then(function(pool:any) {
                    return pool.request().input("Descripcion",mssql.VarChar(15), descripcion)
                     .input("IdSexo", mssql.Int, IdSexo)
                    .execute("sp_sexo_modificar");
                }).then(function(result:any) {
                    sql.close();
                     response=result.recordset;
                }).catch(function(err:any){
                    res.status(400).json([{"Response":false},{text:"Error de la consulta"}]);
                });
             res.json([{"Response":true}]);     
         }else{
          	res.json([{"Response":false},{Error:errores}]);
           }
    }
 }
export const sexoController=new SexoController();
