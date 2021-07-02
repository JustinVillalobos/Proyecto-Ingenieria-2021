import { Component, OnInit } from '@angular/core';
import {Directive,ElementRef,ViewChild} from '@angular/core';

import { DataTablesResponse } from '../../Domain/data-tables-response';
import { NgxSpinnerService } from "ngx-spinner";



import { BoletaService } from '../../Services/boleta.service';
import { ClasificadorService } from '../../Services/clasificador.service';
import {Boleta} from '../../Domain/boleta';
import { AlertsService } from '../../Business/alerts.service';
import { ToastService } from '../../Business/toast.service';
import { ValidatorService } from '../../Business/validator.service';
import { IpService } from '../../Services/ip.service';

import { ServiceService } from '../../Services/service.service';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css']
})


export class BoletaComponent implements OnInit {
  fecha:any=new Date();
  boletaInsertar:any={

    /**
     * 	[IdBoleta] [int] IDENTITY(1,1) NOT NULL,
	[FechaHora] [datetime] NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[PalabraClaveConsulta1] [varchar](100) NOT NULL,
	[PalabraClaveConsulta2] [varchar](100) NULL,
	[AsuntoDetallado] [varchar](500) NULL,
	[IpComputadora] [varchar](15) NOT NULL,
	[CantidadCambios] [tinyint] NULL,
	[IdClasificador] [tinyint] NOT NULL,
	[IdRespuesta] [tinyint] NOT NULL,
	[DetalleRespuesta] [varchar](500) NULL,
	[FechaHoraRespuesta] [datetime] NULL,
	[IdUsuarioRespuesta] [int] NULL,
	[IpComputadoraRespuesta] [varchar](15) NULL,
     */
    CantidadCambios:0,
    iUsuario:localStorage.getItem("Id"),
    fechaHora: new Date(),
    palabraClaveConsulta1: "",
    palabraClaveConsulta2: "",
    asuntoDetallado: "",
    ipComputadora: "",
    idClasificador: 1,

    
  };

  detalle: any={
    archivos:[]

  };
  selectedCar: number;
  files: File[] = [];
  clasificadores:any={
    IdClasificador:1,
		Descripcion:""
  };


 

  showContent:boolean=false;//Variable que controla cuando mostrar el datatable
	dtOptions:DataTables.Settings = {};//Variable con las configuraciones del datatable
  className:any={dark:"border-dark",success:"border-success",danger:"border-danger"};
  stateInsert:any="border-dark";

  constructor(private ClasificadorService:ClasificadorService,
    private BoletaService:BoletaService,  
    private AlertsService:AlertsService,
    private  toastr:ToastService,
    private spinner: NgxSpinnerService,
    private IpService:IpService,

    private ValidatorService:ValidatorService, 
    private config: NgSelectConfig) {
   // var options = { year: 'numeric', month: 'long', day: 'numeric',hour:"numeric", minute:"numeric", second:"numeric" };
       var options = { year: 'numeric', month: 'long', day: 'numeric' };
      //console.log(this.fecha.toLocaleDateString("es-ES", options));
      this.fecha=this.fecha.toLocaleDateString("es-ES", options);
      this.config.notFoundText = 'Item no encontrado';
      this.config.appendTo = 'body';
      this.config.bindValue = 'value';
      this.IpService.getIPAddress().subscribe((res:any)=>{  
        this.boletaInsertar.ipComputadora=res.ip; 
      });
      this.getClasificadores();
      this.dtOptions={
  
         destroy:true,
            responsive: true,
            language: {
              "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
             
            columnDefs: [
                    { width: '80', targets: 0, className:"text-center" },
                    { width: '80', targets: 2, className:"justify-content-center" },
                    {"orderable":false,targets:2}
                  ],
            
    }
      
    
   }

   ngOnInit(): void {
    this.spinner.show();
  }
  /*Seccion de metodos con operacion services*/
  getClasificadores(){
  	this.ClasificadorService.getClasificadores().subscribe(
      res=>{
        this.clasificadores=res;
        console.log(res);
        this.showContent=true;
        this.spinner.hide();
      },
      err=>console.log(err)
    );
  }

  insertBoleta(){
    if(this.boletaInsertar.asunto!="" && this.boletaInsertar.palabraclave!="" && this.boletaInsertar.palabraclave2 && this.boletaInsertar.cantidadCmabios!="" ){
      this.stateInsert=this.className.success;
      this.BoletaService.insert(this.boletaInsertar).subscribe(
        res=>{
          this.stateInsert=this.className.dark;
         if(res[0]["Response"]==true){
              this.AlertsService.alertTimeCorrect("boleta ingresado con éxito",function(component_2){
                          component_2.closeModalInsert.nativeElement.click();
                          component_2.boleta.asunto="";
                          component_2.boleta.palabraclave="";
                          component_2.boleta.palabraclave2="";
                          component_2.boleta.cantidadCambios="";
                          component_2.reload(component_2);
               },this);
          }else{
            this.AlertsService.alertaError("No se insertó el nuevo registro");
             this.toastr.toastrError(res[1]["Error"]);
          }
          
        },
        err=>console.log(err)
      );
    }else{
      this.stateInsert=this.className.danger;
      //this.reloadInsertState();
      this.toastr.toastrError("Los campos de la boleta no pueden ir vacío");
    }
  
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
  this.boletaInsertar.archivos.push(...event.addeFiles.name);
  console.log(this.files);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
}


