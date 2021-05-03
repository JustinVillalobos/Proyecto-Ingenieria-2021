import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../../Services/service.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import {Usuario} from '../../Domain/usuario';
@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css']
})
export class BoletaComponent implements OnInit {
  fecha:any=new Date();
  boleta:any={};
  selectedCar: number;
  files: File[] = [];
    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];
  constructor(private ServiceService:ServiceService,private config: NgSelectConfig) {
   // var options = { year: 'numeric', month: 'long', day: 'numeric',hour:"numeric", minute:"numeric", second:"numeric" };
       var options = { year: 'numeric', month: 'long', day: 'numeric' };
      //console.log(this.fecha.toLocaleDateString("es-ES", options));
      this.fecha=this.fecha.toLocaleDateString("es-ES", options);
      this.config.notFoundText = 'Item no encontrado';
      this.config.appendTo = 'body';
      this.config.bindValue = 'value';
   }

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

 
  }
  

onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
  console.log(this.files);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
}
