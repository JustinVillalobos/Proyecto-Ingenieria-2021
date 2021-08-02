import { Component, OnInit } from '@angular/core';
import {Directive,ElementRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DataTablesResponse } from '../../Domain/data-tables-response';
import { NgxSpinnerService } from "ngx-spinner";

 import {Router} from "@angular/router";

import { BoletaService } from '../../Services/boleta.service';
import { RespuestaLegalService } from '../../Services/respuestaLegal.service';
import {Boleta} from '../../Domain/boleta';
import { AlertsService } from '../../Business/alerts.service';
import { ToastService } from '../../Business/toast.service';
import { ValidatorService } from '../../Business/validator.service';
import { IpService } from '../../Services/ip.service';

import { ServiceService } from '../../Services/service.service';
import { NgSelectConfig } from '@ng-select/ng-select';
@Component({
  selector: 'app-responder-boleta',
  templateUrl: './responder-boleta.component.html',
  styleUrls: ['./responder-boleta.component.css']
})
export class ResponderBoletaComponent implements OnInit {
  fecha:any=new Date();

  boleta:any={
    AsuntoDetallado: "",
    CantidadCambios: 1,
    Detalle: "",
    DetalleRespuesta: null,
    EvidenciaArchivo: "",
    FechaHora: "",
    FechaHoraRespuesta: null,
    IdBoleta: 0,
    IdClasificador: 1,
    IdRespuesta: 1,
    IdUsuario: 0,
    IdUsuarioRespuesta: null,
    IpComputadoraRespuesta: null,
    Linea: 20,
    PalabraClaveConsulta1: "",
    PalabraClaveConsulta2: "",
    Nombre:"",
    Apellidos:"",
    clasificador:""
  };
  boletaUpdate:Boleta={
    IdBoleta:0,
  	FechaHora:new Date(),
    IdUsuario:0,
    PalabraClaveConsulta1:"",
    PalabraClaveConsulta2:"",
    AsuntoDetallado:"",
    IpComputadora:"",
    CantidadCambios:0,
    IdClasificador:0,
    IdRespuesta:1,
    DetalleRespuesta:"",
    FechaHoraRespuesta: new Date(),
    IdUsuarioRespuesta:parseInt(localStorage.getItem("Id")),
    IpComputadoraRespuesta:""
  }
  showContent:boolean=false;
  selected: string="";
  files: File[] = [];
  respuestas:any=[];
    ip:string="";


  className:any={dark:"border-dark",success:"border-success",danger:"border-danger"};
  stateInsert:any="border-dark";
  form: FormGroup;
  constructor(
    private BoletaService:BoletaService,
    private AlertsService:AlertsService,
    private  toastr:ToastService,
    private spinner: NgxSpinnerService,
    private IpService:IpService,
    private ValidatorService:ValidatorService,
    public fb: FormBuilder,
    private RespuestaLegalService:RespuestaLegalService,
    private config: NgSelectConfig,private router:Router) {
      console.log(localStorage.getItem("Id"));
      this.boletaUpdate.IdUsuarioRespuesta=parseInt(localStorage.getItem("Id"));
   // var options = { year: 'numeric', month: 'long', day: 'numeric',hour:"numeric", minute:"numeric", second:"numeric" };

      this.IpService.getIPAddress().subscribe((res:any)=>{
        this.boletaUpdate.IpComputadoraRespuesta=res.ip;
      });
      let ruta=this.router.parseUrl(this.router.url);
      let id=ruta.queryParams['id'];
      this.Boleta(id);



    this.form = this.fb.group({
      avatar: [null]
    });
   }
   getRespuestas(){
    this.RespuestaLegalService.getRespuestas().subscribe(
       res=>{
         this.respuestas=res;

         for(let i=0;i<this.respuestas.length;i++){

           if(this.boleta.IdRespuesta==this.respuestas[i]["IdRespuesta"]){

             this.selected=this.respuestas[i]["IdRespuesta"];

           }
         }


         this.showContent=true;
         this.spinner.hide();
       },
       err=>console.log(err)
     );
   }
   Boleta(idBoleta){
    this.BoletaService.getBoletasDetalleById(idBoleta).subscribe(
       res=>{
        this.boleta=res[0];
        this.boletaUpdate.DetalleRespuesta=this.boleta.DetalleRespuesta;
          this.boletaUpdate.IdBoleta=this.boleta.IdBoleta;

          this.getRespuestas();
         this.showContent=true;
         this.spinner.hide();
       },
       err=>console.log(err)
     );
   }

   ngOnInit(): void {
    this.spinner.show();

  }
  responder(){

    this.boletaUpdate.IdRespuesta=parseInt(this.selected);
    this.BoletaService.update(this.boletaUpdate).subscribe(
       res=>{
         
        if(res["Response"]==true){
             this.AlertsService.alertTimeCorrect("Solicitud respondida con éxito",function(component_2){


              },this);
         }else{
           this.AlertsService.alertaError("No se insertó el nuevo registro");
            this.toastr.toastrError(res[1]["Error"]);
         }

       },
       err=>console.log(err)
     );

  }

}
