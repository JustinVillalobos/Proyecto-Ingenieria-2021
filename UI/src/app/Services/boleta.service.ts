import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environment";

import {Boleta} from '../Domain/boleta';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BoletaService {

 API_URI:string=environment.apiUrl+"/backend/Boleta";
  constructor(private http:HttpClient) { }
  getBoletas(){
    return this.http.get<Boleta[]>(`${this.API_URI}/`);
  }
  upload(file){
    return this.http.post(`${this.API_URI}/upload`,file);
  }
  getBoletasById(codigo:number){
    return this.http.get(`${this.API_URI}/select_by_id?id=${codigo}`);
  }
  getBoletasByEmpleado(codigo:number){
    return this.http.get(`${this.API_URI}/select_by_Empleado?id=${codigo}`);
  }
  insert(boleta:Boleta){
    return this.http.post(`${this.API_URI}/insert`,boleta);
  }
  update(boleta:Boleta){
    return this.http.post(`${this.API_URI}/update`,boleta);
  }

}
