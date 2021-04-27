const sqlConnection = require("../Config");
const mssql2 = require('mssql');
const sql = new sqlConnection();
"use strict";

module.exports = class CommonQueries{
    
   
    public async delete(parameter:number, query:string){
      	let msg:boolean=true;
           await sql.connect().then(function(pool:any) {
                return pool.request()
                .input("id", mssql.Int, parameter)
                .execute(query);
            }).then(function(result:any) {
                sql.close();
                 msg=result.recordset;
            }).catch(function(err:any){
                 msg=false;
            });
         return msg;
    }
    public async select(query:string){
      	let objects:any=[];
           await sql.connect().then(function(pool:any) {
                return pool.request()
                 .execute(query);
            }).then(function(result:any) {
                sql.close();
                objects=result.recordset;
            }).catch(function(err:any){
                  objects={text:"Error de la consulta"};
            });

         return objects;
    }
     public async selectById(parameter:number,query:string){
      	let objects:any=[];
        console.log(parameter+"="+query);

           await sql.connect().then(function(pool:any) {
                return pool.request()
                 .input("id", mssql2.Int, parameter)
                .execute(query);
            }).then(function(result:any) {
                sql.close();
                objects=result.recordset;
            }).catch(function(err:any){
              console.log(err);
                  objects={text:"Error de la consulta"};
            });
         return objects;
    }
 }

