import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {Usuario} from '../Domain/Usuario';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

 API_URI:string="http://localhost:4000/backend";
  constructor(private http:HttpClient) { }
  getSession(){
    return this.http.get(`${this.API_URI}/usuario/session/`);
  }
}
