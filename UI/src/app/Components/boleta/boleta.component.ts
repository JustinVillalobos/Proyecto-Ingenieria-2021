import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../../Services/service.service';

import {Usuario} from '../../Domain/usuario';
@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css']
})
export class BoletaComponent implements OnInit {
  variable:any="Hey";
  constructor(private ServiceService:ServiceService) { }

  ngOnInit(): void {
  }
  getConsulta():void{
  	/*this.ServiceService.getSession().subscribe(
      res=>{
        console.log(res);
        
      },
      err=>console.log(err)
    );*/
  }
  cambiar(){

    this.variable="hola"
  }
}
