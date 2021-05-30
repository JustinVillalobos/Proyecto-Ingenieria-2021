import { Injectable } from '@angular/core';
import  CryptoJS from 'crypto-js'; 
import {environment} from "../environment";
@Injectable({
  providedIn: 'root'
})
export class EncrypterService {
  SECRET:string=environment.encode_secret;
  constructor() { }

  public encrypterData(data){
  	return CryptoJS.AES.encrypt(data, this.SECRET).toString();
  }
   public desEncrypterData(data){
  	return CryptoJS.AES.decrypt(data, this.SECRET ).toString()
  }
}
