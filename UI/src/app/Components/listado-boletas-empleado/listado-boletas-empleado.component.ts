import { Component, OnInit } from '@angular/core';
import { BoletaService } from '../../Services/boleta.service';
import { DataTablesResponse } from '../../Domain/data-tables-response';
import { NgxSpinnerService } from "ngx-spinner";
import { NgSelectConfig } from '@ng-select/ng-select';
@Component({
  selector: 'app-listado-boletas-empleado',
  templateUrl: './listado-boletas-empleado.component.html',
  styleUrls: ['./listado-boletas-empleado.component.css']
})
export class ListadoBoletasEmpleadoComponent implements OnInit {
  showContent:boolean=false;//Variable que controla cuando mostrar el datatable
  fecha:any=new Date();
dtOptions:DataTables.Settings = {};//Variable con las configuraciones del datatable
boletas:any=[];
  constructor(  private BoletaService:BoletaService,
    private spinner: NgxSpinnerService,private config: NgSelectConfig) {
      this.getBoletas();
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
     //console.log(this.fecha.toLocaleDateString("es-ES", options));
     this.fecha=this.fecha.toLocaleDateString("es-ES", options);
     this.config.notFoundText = 'Item no encontrado';
     this.config.appendTo = 'body';
     this.config.bindValue = 'value';
     this.dtOptions={

        destroy:true,
           responsive: true,
           language: {
             "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
           },

           columnDefs: [
                   { width: '80', targets: 0, className:"text-center" },
                   {  width: '150',targets: 1, className:"justify-content-center" },
                   {  targets: 2, className:"justify-content-center" },
                 ],

   }
    }

  ngOnInit(): void {
  }
  getBoletas(){
    let id=localStorage.getItem("Id");
    this.BoletaService.getBoletasByEmpleado(parseInt(id)).subscribe(
      res=>{
        this.boletas=res;
        this.showContent=true;
        this.spinner.hide();
      },
      err=>console.log(err)
    );
  }

}
