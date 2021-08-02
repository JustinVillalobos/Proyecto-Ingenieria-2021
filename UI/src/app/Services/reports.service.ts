import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environment";

import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
API_URI:string=environment.apiUrl+"/backend/Reports";
  constructor(private http:HttpClient) { }
  getReportForRange(initDate,EndDate){
    return this.http.get(`${this.API_URI}/range?initDate=${initDate}&endDate=${EndDate}`);
  }
  all(){
    return this.http.get(`${this.API_URI}/`);
  }
  getReportForDepartment(dept){
    return this.http.get(`${this.API_URI}/department?IdDepartamento=${dept}`);
  }
  getReportForUser(userId){
    return this.http.get(`${this.API_URI}/user?IdUsuario=${userId}`);
  }
  getReportForTheme(theme){
    return this.http.get(`${this.API_URI}/theme?theme=${theme}`);
  }
  getReportForDepartmentAndDate(initDate,dept){
    return this.http.get(`${this.API_URI}/departmentAndDate?init=${initDate}&IdDepartamento=${dept}`);
  }
   getReportForUserAndClasificator(user,clasificator){
    return this.http.get(`${this.API_URI}/userandclasificator?IdUsuario=${user}&IdClasificator=${clasificator}`);
  }
   getReportForResume(){
    return this.http.get(`${this.API_URI}/resume`);
  }
}
