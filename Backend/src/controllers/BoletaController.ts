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

class  BoletaController{
    constructor(){

    }

    public async list(req:Request,res:Response){
        let boletas:any=[];
      boletas= await common.select("sp_boleta_list");
      res.json(boletas);
    }

  public async selectById(req:Request,res:Response){
      const id=req.query.id;
        let boletas:any=[];
        console.log(req.query.id);
      boletas= await common.selectById(id,"sp_boleta_select_by_id");
      res.json(boletas);
  }

  public async selectBoleta(req:Request,res:Response){

    const fechaHora = req.query.fechaHora;
    const idUsuario = req.query.idUsuario;
    const palabraClaveConsulta1 = req.query.palabraClaveConsulta1;
    const palabraClaveConsulta2 = req.query.palabraClaveConsulta2;
    const asuntoDetallado = req.query.asuntoDetallado;
    let ipComputadora = req.query.ipComputadora;
    const cantidadCambios = req.query.cantidadCambios;
    const idClasificador = req.query.idClasificador;


      let boletas:any=[];
      console.log(req.query.id);
    boletas= await common.selectById(fechaHora, idUsuario, palabraClaveConsulta1, palabraClaveConsulta2, asuntoDetallado,ipComputadora,cantidadCambios, idClasificador,"sp_boleta_select");
    res.json(boletas);
}


   public async delete(req:Request,res:Response){
       const id=req.query.id;
        let response:any;
      response= await common.select(id,"sp_boleta_delete");
      res.json(response);
  }

  
   public async insert(req:Request,res:Response){
       
       const fechaHora = new Date();
       const idUsuario = [req.body.idUsuario];
       const palabraClaveConsulta1 = [req.body.palabraClaveConsulta1];
       const palabraClaveConsulta2 = [req.body.palabraClaveConsulta2];
       const asuntoDetallado = [req.body.asuntoDetallado];
       let ipComputadora = [req.body.ipComputadora];
       const cantidadCambios = [req.body.cantidadCambios];
       const idClasificador = [req.body.idClasificador];
       const idRespuesta = [req.body.idRespuesta];
       
       let response:any;

       let boletas:any=[];
       let controller=new BoletaController();
       let id=0; 

         await sql.connect().then(function(pool:any) {
              return pool.request()
              
              .input("FechaHora", mssql.DateTime, fechaHora)
              .input("IdUsuario", mssql.Int, idUsuario)
              .input("PalabraClaveConsulta1", mssql.VarChar, palabraClaveConsulta1)
              .input("PalabraClaveConsulta2", mssql.VarChar, palabraClaveConsulta2)
              .input("AsuntoDetallado", mssql.VarChar, asuntoDetallado)
              .input("IpComputadora", mssql.VarChar, ipComputadora)
              .input("CantidadCambios", mssql.Tinyint, cantidadCambios)
              .input("IdClasificador", mssql.Tinyint,idClasificador)
              .input("IdRespuesta", mssql.Tinyint, idRespuesta)
              
              .execute("sp_boleta_insertar");
          }).then(function(result:any) {
            boletas=result.recordset;
              sql.close();
              if(boletas.length>0){
                id=boletas[0].idBoleta;
                controller.insertarDetalle(req,res,id,boletas[0]);
            }
               
          }).catch(function(err:any){
              console.log(err);
              res.status(400).json({text:"Error de la consulta"});
          });
       res.json(response);
  }

  public async insertarDetalle(req:Request,res:Response,id:number,data:any){

    const evidenciaArchivo = [req.body.evidenciaArchivo];
    const detalle = [req.body.detalle];
    
    let response:any;

    
      await sql.connect().then(function(pool:any) {
           return pool.request()
           
           .input("IdBoleta", mssql.Int, id)
           .input("EvidenciaArchivo", mssql.VarChar, evidenciaArchivo)
           .input("Detalle", mssql.VarChar, detalle)
           
           .execute("sp_detalle_insertar");
       }).then(function(result:any) {
         
           sql.close();
           response=result.recordset;
         
            
       }).catch(function(err:any){
           console.log(err);
           res.status(400).json({text:"Error de la consulta"});
       });
    res.json(response);

  }


  public async update(req:Request,res:Response){
    const idRespuesta = [req.body.idRespuesta];
    const idBoleta = [req.body.idBoleta];
    const detalleRespuesta = [req.body.detalleRespuesta];
    const fechaHoraRespuesta = [req.body.fechaHoraRespuesta];
    const idUsuarioRespuesta = [req.body.idUsuarioRespuesta];
    let ipComputadoraRespuesta = [req.body.ipComputadoraRespuesta];
    let response:any;
      await sql.connect().then(function(pool:any) {
             return pool.request()
             .input("IdBoleta", mssql.Int, idBoleta)
             .input("IdRespuesta", mssql.Tinyint, idRespuesta)
              .input("DetalleRespuesta", mssql.VarChar,detalleRespuesta)
              .input("FechaHoraRespuesta",mssql.DateTime, fechaHoraRespuesta)
              .input("IdUsuarioRespuesta", mssql.Int, idUsuarioRespuesta)
              .input("IpComputadoraRespuesta", mssql.VarChar, ipComputadoraRespuesta)
             .execute("sp_boleta_modificar");
         }).then(function(result:any) {
             sql.close();
              response=result.recordset;
         }).catch(function(err:any){
             res.status(400).json({text:"Error de la consulta"});
         });
      res.json(response);
 }

  

}

export const boletaController = new BoletaController();