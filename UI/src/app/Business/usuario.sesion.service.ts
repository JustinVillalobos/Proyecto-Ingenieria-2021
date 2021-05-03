import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSesionService {
IdUsuario:string="";
    cedula:string="";
    usuario:any=[];
  constructor( ) { }
    

  parameters(){

  }
  getUsuarioByCedulaId(cedula,IdUsuario){
    
  }
}
