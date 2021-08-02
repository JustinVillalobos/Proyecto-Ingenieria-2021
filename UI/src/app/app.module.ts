import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';

import {InicioSesionComponent} from './Components/inicio-sesion/inicio-sesion.component';
import { BoletaComponent } from './Components/boleta/boleta.component';
import { SexoComponent } from './Components/sexo/sexo.component';
import {ServiceService} from './Services/service.service';
import { CuboComponent } from './Components/cubo/cubo.component';


//import { DxPivotGridModule } from 'devextreme-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { DataTablesModule } from 'angular-datatables';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';

import { HeaderComponent } from './Templates/header/header.component';
import { LeftSidebarComponent } from './Templates/left-sidebar/left-sidebar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HeaderMinComponent } from './Templates/header-min/header-min.component';
import { LeftSidebarMinComponent } from './Templates/left-sidebar-min/left-sidebar-min.component';
import { MenuComponent } from './Templates/menu/menu.component';
import { DepartamentoComponent } from './Components/departamento/departamento.component';
import { ClasificadorComponent } from './Components/clasificador/clasificador.component';
import { ListadoBoletasEmpleadoComponent } from './Components/listado-boletas-empleado/listado-boletas-empleado.component';
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
import { MenuRptComponent } from './Templates/menu-rpt/menu-rpt.component';


const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    BoletaComponent,
    CuboComponent,
    HeaderComponent,
    LeftSidebarComponent,
    DashboardComponent,
    SexoComponent,
    HeaderMinComponent,
    LeftSidebarMinComponent,
    MenuComponent,
    DepartamentoComponent,
    ClasificadorComponent,
    ListadoBoletasEmpleadoComponent,
    ListadoBoletasComponent,
    ResponderBoletaComponent,
    BoletasRangoFechasComponent,
    BoletasDepartamentoComponent,
    BoletasUsuarioComponent,
    BoletasTemaComponent,
    BoletasDepartamentoMesComponent,
    BoletasUsuarioClasificadorComponent,
    BoletasDepartamentoCantidadComponent,
    BoletasResumenComponent,
    MenuRptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    DataTablesModule, RouterModule,
    ToastrModule.forRoot(),
    NgxDropzoneModule,
     NgxMaskModule.forRoot(maskConfig),
     NgxSpinnerModule,
     NgSelectModule,
     PdfViewerModule
     
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
