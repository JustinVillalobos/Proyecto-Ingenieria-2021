import { Component, OnInit } from '@angular/core';
 import { UsuarioService } from '../../Services/usuario.service';
  import { AuthService } from '../../Services/auth.service';
 import {Router} from "@angular/router";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
	data:any=[];
	showContent:boolean=false;
  constructor(private usuarioService:UsuarioService,private router:Router,private AuthService:AuthService) { }
  ngOnInit(): void {
  	this.initComponent();
  }
  initComponent(){
    this.auth();
    this.usuarioService.getusuarioByCedulaId(localStorage.getItem("cedula"),localStorage.getItem("Id")).subscribe(
      res=>{
         if(res[1]["Response"]===true){
           if(res[0]["Usuario"][0]["IdDepartamento"]===1){
             this.showContent=true;
             
           }else{
             this.showContent=false;
           }
         }else{
            this.router.navigate(['/UI']);
         }
       
      },
      err=>console.log(err)
    );
  }
  auth(){
    let token=localStorage.getItem("auth_token");
         if(token.length==0){
           this.router.navigate(['/UI']);
         }else{
            this.AuthService.auth(token).subscribe(
             res=>{
               if(res["Response"]!=true){
                 this.router.navigate(['/UI']);
               }
              },
              err=>{this.router.navigate(['/UI']);}
            );
         }
       

  }

}
