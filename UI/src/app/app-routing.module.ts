import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioSesionComponent} from './Components/inicio-sesion/inicio-sesion.component';
import { BoletaComponent } from './Components/boleta/boleta.component';
import { ListadoBoletasEmpleadoComponent } from './Components/listado-boletas-empleado/listado-boletas-empleado.component';
import { CuboComponent } from './Components/cubo/cubo.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SexoComponent } from './Components/sexo/sexo.component';
import { ClasificadorComponent } from './Components/clasificador/clasificador.component';
import { DepartamentoComponent } from './Components/departamento/departamento.component';
import { ListadoBoletasComponent } from './Components/listado-boletas/listado-boletas.component';
import { ResponderBoletaComponent } from './Components/responder-boleta/responder-boleta.component';
import { BoletasRangoFechasComponent } from './Reports/boletas-rango-fechas/boletas-rango-fechas.component';
import { BoletasDepartamentoComponent } from './Reports/boletas-departamento/boletas-departamento.component';
import { BoletasUsuarioComponent } from './Reports/boletas-usuario/boletas-usuario.component';
import { BoletasTemaComponent } from './Reports/boletas-tema/boletas-tema.component';
import { BoletasDepartamentoMesComponent } from './Reports/boletas-departamento-mes/boletas-departamento-mes.component';
import { BoletasUsuarioClasificadorComponent } from './Reports/boletas-usuario-clasificador/boletas-usuario-clasificador.component';
import { BoletasDepartamentoCantidadComponent } from './Reports/boletas-departamento-cantidad/boletas-departamento-cantidad.component';
import { BoletasResumenComponent } from './Reports/boletas-resumen/boletas-resumen.component';
const routes: Routes = [
{path:'',
  redirectTo:'/UI',
  pathMatch:'full'},
{path:'UI',
  component:InicioSesionComponent},
  {path:'boleta',
  component:BoletaComponent},
  {path:'listado_por_empleado',
  component:ListadoBoletasEmpleadoComponent},
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
  component:ClasificadorComponent},
  {path:'listado_boleta',
  component:ListadoBoletasComponent},
  {path:'responder_boleta',
  component:ResponderBoletaComponent},
  {path:'rpt-1',
  component:BoletasRangoFechasComponent},
  {path:'rpt-2',
  component:BoletasDepartamentoComponent},
  {path:'rpt-3',
  component:BoletasUsuarioComponent},
  {path:'rpt-4',
  component:BoletasDepartamentoMesComponent}
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
