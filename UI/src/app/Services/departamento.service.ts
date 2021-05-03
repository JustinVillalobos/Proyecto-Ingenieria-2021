import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environment";

import {Departamento} from '../Domain/departamento';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  
 API_URI:string=environment.apiUrl+"/backend/Departamento";
  constructor(private http:HttpClient) { }
  getDepartamentos(){
    return this.http.get<Departamento[]>(`${this.API_URI}/`);
  }
  getDepartamentoById(codigo:number){
    return this.http.get(`${this.API_URI}/select_by_id?id=${codigo}`);
  }
  insert(departamento:Departamento){
    return this.http.post(`${this.API_URI}/insert`,departamento);
  }
  update(departamento:Departamento){
    return this.http.post(`${this.API_URI}/update`,departamento);
  }
  delete(codigo:number){
    return this.http.get(`${this.API_URI}/delete?id=${codigo}`);
  }
}
