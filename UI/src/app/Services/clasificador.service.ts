import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environment";

import {Clasificador} from '../Domain/clasificador';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClasificadorService {

 API_URI:string=environment.apiUrl+"/backend/Clasificador";
  constructor(private http:HttpClient) { }
  getClasificadores(){
    return this.http.get<Clasificador[]>(`${this.API_URI}/`);
  }
  getClasificadorById(codigo:number){
    return this.http.get(`${this.API_URI}/select_by_id?id=${codigo}`);
  }
  insert(clasificador:Clasificador){
    return this.http.post(`${this.API_URI}/insert`,clasificador);
  }
  update(clasificador:Clasificador){
    return this.http.post(`${this.API_URI}/update`,clasificador);
  }
  delete(codigo:number){
    return this.http.get(`${this.API_URI}/delete?id=${codigo}`);
  }
}
