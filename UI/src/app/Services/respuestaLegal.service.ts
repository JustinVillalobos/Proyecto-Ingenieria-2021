import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environment";

import {RespuestaLegal} from '../Domain/respuestaLegal';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RespuestaLegalService {

 API_URI:string=environment.apiUrl+"/backend/RespuestaLegal";
  constructor(private http:HttpClient) { }
  getRespuestas(){
    return this.http.get<RespuestaLegal[]>(`${this.API_URI}/`);
  }
  upload(file){
    return this.http.post(`${this.API_URI}/upload`,file);
  }
  getRespuestassById(codigo:number){
    return this.http.get(`${this.API_URI}/select_by_id?id=${codigo}`);
  }
  insert(boleta:RespuestaLegal){
    return this.http.post(`${this.API_URI}/insert`,boleta);
  }
  update(boleta:RespuestaLegal){
    return this.http.post(`${this.API_URI}/update`,boleta);
  }

}
