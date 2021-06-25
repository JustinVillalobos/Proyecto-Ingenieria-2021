import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioSesionComponent} from './Components/inicio-sesion/inicio-sesion.component';
import { BoletaComponent } from './Components/boleta/boleta.component';
import { CuboComponent } from './Components/cubo/cubo.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SexoComponent } from './Components/sexo/sexo.component';
import { ClasificadorComponent } from './Components/clasificador/clasificador.component';
import { DepartamentoComponent } from './Components/departamento/departamento.component';
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
  {path:'Pereza',
  component:CuboComponent},
  {path:'dashboard',
  component:DashboardComponent},
  {path:'sexo',
  component:SexoComponent},
  {path:'departamento',
  component:DepartamentoComponent},
  {path:'clasificador',
  component:ClasificadorComponent}
  ];
//localhost:4200/departamento
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*
  ng g c Components/respuestalegal
*/