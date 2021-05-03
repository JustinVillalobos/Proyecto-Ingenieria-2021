import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environment";

import {Usuario} from '../Domain/usuario';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API_URI:string=environment.apiUrl+"/backend/Usuario";
  constructor(private http:HttpClient) { }
  getusuarios(){
    return this.http.get(`${this.API_URI}/`);
  }
  getusuarioBySesion(correo:string,password:string,ip:string){
    return this.http.get(`${this.API_URI}/select_by_sesion?correo=${correo}&&password=${password}&&ip=${ip}`);
  }
  getusuarioByCedulaId(cedula:string,id:string){
    return this.http.get(`${this.API_URI}/select_by_cedula_id?cedula=${cedula}&&id=${id}`);
  }
}
