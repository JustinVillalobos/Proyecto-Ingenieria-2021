import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private  toastr:ToastrService) { }
  toastrError(mensaje:string){
  	this.toastr.error(mensaje, 'Error', {
          timeOut: 4000,
          positionClass: 'toast-bottom-right',
          progressBar:true,
          progressAnimation:'increasing'
        });
  }
   toastrWarning(mensaje:string){
  	this.toastr.warning(mensaje, 'Cuidado', {
          timeOut: 4000,
          positionClass: 'toast-bottom-right',
          progressBar:true,
          progressAnimation:'increasing'
        });
  }
   toastrSuccess(mensaje:string){
  	this.toastr.success(mensaje, 'Acción realizada', {
          timeOut: 4000,
          positionClass: 'toast-bottom-right',
          progressBar:true,
          progressAnimation:'increasing'
        });
  }
   toastrInfo(mensaje:string){
  	this.toastr.info(mensaje, 'Información', {
          timeOut: 4000,
          positionClass: 'toast-bottom-right',
          progressBar:true,
          progressAnimation:'increasing'
        });
  }
}
