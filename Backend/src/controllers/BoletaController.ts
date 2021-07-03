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

    public async list_boleta_detalle(req:Request,res:Response){
      let boletas:any=[];
    boletas= await common.select("sp_boleta_detalle_list");
    res.json(boletas);
  }

  public async list_boleta_respuesta(req:Request,res:Response){
    let boletas:any=[];
  boletas= await common.select("sp_boleta_respuestaLegal_list");
  res.json(boletas);
}


    public async upload(req:Request,res:Response){
      var ruta=req.files["imagen"]["path"].split("\\");
    res.json({"Response":true,"newName":ruta[2]});


    }
  public async selectById(req:Request,res:Response){
      const id=req.query.id;
        let boletas:any=[];
        console.log(req.query.id);
      boletas= await common.selectById(id,"sp_boleta_select_by_id");
      res.json(boletas);
  }

  public async selectBoletaDetalleById(req:Request,res:Response){
    const id=req.query.id;
      let boletas:any=[];
      console.log(req.query.id);
    boletas= await common.selectById(id,"sp_boleta_detalle_select_by_Id");
    res.json(boletas);
}

public async selectBoletaRespuestaById(req:Request,res:Response){
  const id=req.query.id;
    let boletas:any=[];
    console.log(req.query.id);
  boletas= await common.selectById(id,"sp_boleta_respuestaLegal_select_by_Id");
  res.json(boletas);
}

  public async selectBoleta(req:Request,res:Response,fechaHora:any){

    const idUsuario = [req.body.IdUsuario];
    const palabraClaveConsulta1 = [req.body.PalabraClaveConsulta1];
    const palabraClaveConsulta2 = [req.body.PalabraClaveConsulta2];
    const asuntoDetallado = [req.body.AsuntoDetallado];
    let ipComputadora = [req.body.IpComputadora];
    const cantidadCambios = [req.body.CantidadCambios];
    const idClasificador = [req.body.IdClasificador];
    const idRespuesta = 1;


      let boletas:any=[];

      let controller=new BoletaController();
      await sql.connect().then(function(pool:any) {
           return pool.request()

           .input("FechaHora", mssql.DateTime, fechaHora)
           .input("IdUsuario", mssql.Int, idUsuario)
           .input("PalabraClaveConsulta1", mssql.VarChar, palabraClaveConsulta1)
           .input("PalabraClaveConsulta2", mssql.VarChar, palabraClaveConsulta2)
           .input("AsuntoDetallado", mssql.VarChar, asuntoDetallado)
           .input("IpComputadora", mssql.VarChar, ipComputadora)
           .input("CantidadCambios", mssql.TinyInt, cantidadCambios)
           .input("IdClasificador", mssql.TinyInt,idClasificador)
           .input("IdRespuesta", mssql.TinyInt,1)
           .execute("p_boleta_select");
       }).then(function(result:any) {
         boletas=result.recordset;
           sql.close();

          controller.insertarDetalle(req,res,boletas[0].IdBoleta);

       }).catch(function(err:any){
           res.status(400).json({text:"Error de la consulta"});
       });

}


   public async delete(req:Request,res:Response){
       const id=req.query.id;
        let response:any;
      response= await common.select(id,"sp_boleta_delete");
      res.json(response);
  }
  public async selectByEmpleado(req:Request,res:Response){
      const id=req.query.id;
       let response:any;
     response= await common.selectById(id,"sp_boleta_empleado");
     res.json(response);
 }


   public async insert(req:Request,res:Response){

       const fechaHora = new Date();
       const idUsuario = [req.body.IdUsuario];
       const palabraClaveConsulta1 = [req.body.PalabraClaveConsulta1];
       const palabraClaveConsulta2 = [req.body.PalabraClaveConsulta2];
       const asuntoDetallado = [req.body.AsuntoDetallado];
       let ipComputadora = [req.body.IpComputadora];
       const cantidadCambios = [req.body.CantidadCambios];
       const idClasificador = [req.body.IdClasificador];
       const idRespuesta = 1;
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
              .input("CantidadCambios", mssql.TinyInt, cantidadCambios)
              .input("IdClasificador", mssql.TinyInt,idClasificador)
              .input("IdRespuesta", mssql.TinyInt, idRespuesta)

              .execute("p_boleta_insertar");
          }).then(function(result:any) {
            boletas=result.recordset;
              sql.close();
              controller.selectBoleta(req,res,fechaHora);


          }).catch(function(err:any){
              console.log(err);
              res.status(400).json({text:"Error de la consulta"});
          });

  }

  public async insertarDetalle(req:Request,res:Response,id:number){

    const evidenciaArchivo = [req.body.Detalle.EvidenciaArchivo];
    const detalle = [req.body.Detalle.detalle];

    let response:any;


      await sql.connect().then(function(pool:any) {
           return pool.request()

           .input("IdBoleta", mssql.Int, id)
           .input("EvidenciaArchivo", mssql.VarChar, evidenciaArchivo)
           .input("Detalle", mssql.VarChar, detalle)

           .execute("p_detalle_insertar");
       }).then(function(result:any) {

           sql.close();

             res.json({"Response":true});
       }).catch(function(err:any){
           console.log(err);
           res.status(400).json([{text:"Error de la consulta"},{"Response":false}]);
       });


  }


  public async update(req:Request,res:Response){
    const idRespuesta = [req.body.idRespuesta];
    const idBoleta = [req.body.idBoleta];
    const detalleRespuesta = [req.body.detalleRespuesta];
    const fechaHoraRespuesta = new Date();
    const idUsuarioRespuesta = [req.body.idUsuarioRespuesta];
    let ipComputadoraRespuesta = [req.body.ipComputadoraRespuesta];
    let response:any;
    
      await sql.connect().then(function(pool:any) {
        
             return pool.request()
             .input("IdBoleta", mssql.Int, idBoleta)
             .input("IdRespuesta", mssql.TinyInt, idRespuesta)
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
