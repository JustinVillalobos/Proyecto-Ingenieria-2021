import { Component, OnInit } from '@angular/core';
import { BoletaService } from '../../Services/boleta.service';
import { DataTablesResponse } from '../../Domain/data-tables-response';
import { NgxSpinnerService } from "ngx-spinner";
import { NgSelectConfig } from '@ng-select/ng-select';
@Component({
  selector: 'app-listado-boletas',
  templateUrl: './listado-boletas.component.html',
  styleUrls: ['./listado-boletas.component.css']
})
export class ListadoBoletasComponent implements OnInit {
  showContent:boolean=false;//Variable que controla cuando mostrar el datatable
  fecha:any=new Date();
dtOptions:DataTables.Settings = {};//Variable con las configuraciones del datatable
boletas:any=[];
  constructor(private BoletaService:BoletaService,
    private spinner: NgxSpinnerService,private config: NgSelectConfig) {
      this.getBoletas();
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
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
                   { width: '30', targets: 0, className:"text-center" },
                   {  width: '150',targets: 1, className:"text-center" },
                   {  width: '150',targets: 2, className:" "},
                      {  width: '100',targets: 4, className:" "},
                   {  width: '25',targets: 5, className:"justify-content-center" }
                 ],

   }
    }

  ngOnInit(): void {
  }
  getBoletas(){
    this.BoletaService.getBoletasRespuestas().subscribe(
      res=>{
        this.boletas=res;
        this.showContent=true;
        this.spinner.hide();
      },
      err=>console.log(err)
    );
  }

}
