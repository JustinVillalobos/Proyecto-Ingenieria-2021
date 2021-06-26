import { Component, OnInit } from '@angular/core';
import {Directive,ElementRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
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

  boleta:any={
    IdBoleta:0,
    FechaHora:new Date(),
    IdUsuario:localStorage.getItem("Id"),
    PalabraClaveConsulta1:"",
    PalabraClaveConsulta2:"",
    AsuntoDetallado:"",
    IpComputadora:"",
    CantidadCambios:0,
    IdClasificador:0,
    Detalle:{
      Linea:0,
      EvidenciaArchivo:"",
      detalle:""

    }
  };
  showContent:boolean=false;
  selected: number;
  files: File[] = [];
  clasificadores:any=[];
    ip:string="";


  className:any={dark:"border-dark",success:"border-success",danger:"border-danger"};
  stateInsert:any="border-dark";
  form: FormGroup;
  constructor(private ClasificadorService:ClasificadorService,
    private BoletaService:BoletaService,
    private AlertsService:AlertsService,
    private  toastr:ToastService,
    private spinner: NgxSpinnerService,
    private IpService:IpService,
    private ValidatorService:ValidatorService,
    public fb: FormBuilder,
    private config: NgSelectConfig) {
   // var options = { year: 'numeric', month: 'long', day: 'numeric',hour:"numeric", minute:"numeric", second:"numeric" };

      this.IpService.getIPAddress().subscribe((res:any)=>{
        this.boleta.IpComputadora=res.ip;
      });
      this.getClasificadores();


    this.form = this.fb.group({
      avatar: [null]
    });
   }

   ngOnInit(): void {
    this.spinner.show();

  }
  /*Seccion de metodos con operacion services*/
  getClasificadores(){
  	this.ClasificadorService.getClasificadores().subscribe(
      res=>{
        this.clasificadores=res;
        this.showContent=true;
        this.spinner.hide();
      },
      err=>console.log(err)
    );
  }
uploadFile(){

    if(this.boleta.AsuntoDetallado!="" && this.boleta.PalabraClaveConsulta1!="" && this.boleta.IdClasificador!=0 && this.files.length!=0){
     var formData: any = new FormData();
     formData.append("imagen", this.form.get('avatar').value);

    this.BoletaService.upload(formData).subscribe(
      res=>{
        if(res["Response"]){
          this.boleta.Detalle.EvidenciaArchivo=res["newName"];
          this.insert();
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
enviar(){
  this.boleta.IdClasificador=this.selected;
    this.uploadFile();
}
  insert(){
      this.stateInsert=this.className.success;
     this.BoletaService.insert(this.boleta).subscribe(
        res=>{
          this.stateInsert=this.className.dark;
         if(res["Response"]==true){
              this.AlertsService.alertTimeCorrect("Solicitud envíada con éxito",function(component_2){

                          component_2.boleta.AsuntoDetallado="";
                          component_2.boleta.PalabraClaveConsulta1="";
                          component_2.boleta.PalabraClaveConsulta2="";
                          component_2.boleta.CantidadCambios=0;
                          component_2.boleta.Detalle.detalle="";
                          component_2.selected=0;
                          component_2.files=[];
               },this);
          }else{
            this.AlertsService.alertaError("No se insertó el nuevo registro");
             this.toastr.toastrError(res[1]["Error"]);
          }

        },
        err=>console.log(err)
      );


  }



  cambiar(){


  }


onSelect(event) {
  this.files.push(...event.addedFiles);
  this.boleta.Detalle.EvidenciaArchivo=event.addedFiles[0].name;
  this.form.patchValue({
     avatar: this.files[0]
   });
   this.form.get('avatar').updateValueAndValidity()
}

onRemove(event) {
  this.files.splice(this.files.indexOf(event), 1);
}
}
