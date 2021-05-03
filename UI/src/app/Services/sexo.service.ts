import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environment";

import {Sexo} from '../Domain/sexo';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SexoService {

  API_URI:string=environment.apiUrl+"/backend/Sexo";
  constructor(private http:HttpClient) { }
  getSexos(){
    return this.http.get<Sexo[]>(`${this.API_URI}/`);
  }
  getSexoById(codigo:number){
    return this.http.get(`${this.API_URI}/select_by_id?id=${codigo}`);
  }
  insert(sexo:Sexo){
    return this.http.post(`${this.API_URI}/insert`,sexo);
  }
  update(sexo:Sexo){
    return this.http.post(`${this.API_URI}/update`,sexo);
  }
  delete(codigo:number){
    return this.http.get(`${this.API_URI}/delete?id=${codigo}`);
  }
}
