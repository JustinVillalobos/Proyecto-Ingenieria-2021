import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioSesionComponent} from './Components/inicio-sesion/inicio-sesion.component';
import { BoletaComponent } from './Components/boleta/boleta.component';
const routes: Routes = [
{path:'',
  redirectTo:'/UI',
  pathMatch:'full'},
{path:'UI',
  component:InicioSesionComponent},
  {path:'boleta',
  component:BoletaComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
