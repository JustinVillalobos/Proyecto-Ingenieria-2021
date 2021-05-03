import { Component, OnInit } from '@angular/core';
import {Directive,ElementRef,ViewChild} from '@angular/core';

import { DataTablesResponse } from '../../Domain/data-tables-response';//datatable
import { NgxSpinnerService } from "ngx-spinner";//Spinner



import { DepartamentoService } from '../../Services/departamento.service';
import {Departamento} from '../../Domain/departamento';
import { AlertsService } from '../../Business/alerts.service';
import { ToastService } from '../../Business/toast.service';
import { ValidatorService } from '../../Business/validator.service';
@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  /*Seccion de variables*/
	departamentos:Departamento[]=[];	
	departamento:Departamento={
		IdDepartamento:1,
		Descripcion:""
	};
	Iddepartamento:number=1;

	showContent:boolean=false;//Variable que controla cuando mostrar el datatable
	dtOptions:DataTables.Settings = {};//Variable con las configuraciones del datatable
  className:any={dark:"border-dark",success:"border-success",danger:"border-danger"};
  stateInsert:any="border-dark";
  stateUpdate:any=this.className.dark;

    @ViewChild('closeModal') closeModal: ElementRef;//document.getElemebtById('closeModal')
    @ViewChild('closeModalInsert') closeModalInsert: ElementRef;
/*Inicializacion de variables NgOnInit y Constructor*/
  constructor(private departamentoService:DepartamentoService,
    private AlertsService:AlertsService,
    private  toastr:ToastService,
    private spinner: NgxSpinnerService,
    private ValidatorService:ValidatorService) { 

  	this.getdepartamentos();
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
  getdepartamentos(){
  	this.departamentoService.getDepartamentos().subscribe(
      res=>{
        this.departamentos=res;
        this.showContent=true;
        this.spinner.hide();
      },
      err=>console.log(err)
    );
  }
  /*getdepartamentoById(){
  	this.departamentoService.getdepartamentoById(this.Iddepartamento).subscribe(
      res=>{
        console.log(res);
      },
      err=>console.log(err)
    );
  }*/
    insertdepartamento(){
      if(this.departamento.Descripcion!=""){
        this.stateInsert=this.className.success;
        this.departamentoService.insert(this.departamento).subscribe(
          res=>{
            this.stateInsert=this.className.dark;
           if(res[0]["Response"]==true){
                this.AlertsService.alertTimeCorrect("departamento ingresado con éxito",function(component_2){
                            component_2.closeModalInsert.nativeElement.click();
                            component_2.departamento.Descripcion="";
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
        this.reloadInsertState();
        this.toastr.toastrError("La descripción del departamento no puede ir vacío");
      }
    
    }

    deletedepartamento(ID){
      this.AlertsService.confirmacion("¿Esta seguro de eliminar a este departamento?",function(response,component){
        if(response==true){
            component.departamentoService.delete(ID).subscribe(
              res=>{
                if(res[0]["Response"]==true){
                  component.AlertsService.alertTimeCorrect("departamento eliminado con éxito",function(component_2){
                         component_2.reload(component_2);
                     },component);
                }else{
                   component.AlertsService.alertaError("No se eliminó ningún registro");
                }
              },
              err=>console.log(err)
            );
        }else{
          component.AlertsService.alertaWarning("No se eliminó ningún registro");
        }
      },this);
    	
    }

    updatedepartamento(){
         if(this.departamento.Descripcion!=""){
            this.stateUpdate=this.className.success;
            this.AlertsService.confirmacion("¿Esta seguro de modificar a este departamento?",function(response,component){
            if(response==true){
                component.departamentoService.update(component.departamento).subscribe(
                    res=>{
                       component.stateUpdate=component.className.dark;
                      if(res[0]["Response"]===true){
                         component.AlertsService.alertTimeCorrect("departamento actualizado con éxito",function(component_2){
                            component_2.closeModal.nativeElement.click();
                            component_2.departamento.Descripcion="";
                            component_2.reload(component_2);
                         },component);
                      }else{
                         component.AlertsService.alertaError("No se modificó ningún registro");
                         component.toastr.toastrError(res[1]["Error"]);
                      }
                    },
                    err=>console.log(err)
                  );
            }else{
              component.AlertsService.alertaWarning("No se modificó ningún registro");

            }
          },this);
    	}else{
        this.stateUpdate=this.className.danger;
         this.reloadUpdateState();
         this.toastr.toastrError("La descripción del departamento no puede ir vacío");
      }
    }

  
    /*Seccion de metodos con operaciones logicas o validaciones*/

    selectedItem(ID:number,Descripcion:string){
      
      this.departamento.IdDepartamento=ID;
      this.departamento.Descripcion=Descripcion;
    }

    reload(component){
       
       component.getdepartamentos();
    }

    reloadInsertState(){
          setInterval(() => {
           this.stateInsert=this.className.dark;
        }, 2000);
    }
     reloadUpdateState(){
      
          setInterval(() => {
           this.stateUpdate=this.className.dark;
        }, 2000);
    }
    validateDescripcion(event){
      const response=this.ValidatorService.validarPalabrasSinEspacio(event,15);
      if(response==false){
         event.preventDefault();
        this.toastr.toastrError("No se pudo ingresar ese caracter,solo se permiten letras y que la palabra sea de menos de 15 letras");
      }
    }


}
