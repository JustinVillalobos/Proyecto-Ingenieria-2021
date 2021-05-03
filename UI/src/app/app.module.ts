import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
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
    ClasificadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTablesModule, RouterModule,
    ToastrModule.forRoot(),
    NgxDropzoneModule,
     NgxMaskModule.forRoot(maskConfig),
     NgxSpinnerModule,
     NgSelectModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
