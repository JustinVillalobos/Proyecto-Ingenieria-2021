import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioSesionComponent} from './Components/inicio-sesion/inicio-sesion.component';
import { BoletaComponent } from './Components/boleta/boleta.component';
import { CuboComponent } from './Components/cubo/cubo.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
const routes: Routes = [
{path:'',
  redirectTo:'/UI',
  pathMatch:'full'},
{path:'UI',
  component:InicioSesionComponent},
  {path:'boleta',
  component:BoletaComponent},
  {path:'Cubo',
  component:CuboComponent},
  {path:'dashboard',
  component:DashboardComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
