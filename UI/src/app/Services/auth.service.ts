import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environment";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 API_URI:string=environment.apiUrl+"/backend/Auth";
  constructor(private http:HttpClient) { }
  getusuarioBySesion(usuarioSession){
    return this.http.post(`${this.API_URI}/`,usuarioSession);
  }
  auth(token){ 
    return this.http.post(`${this.API_URI}/auth`,{"token":token});
  }
}
