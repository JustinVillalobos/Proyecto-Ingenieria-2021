import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import {InicioSesionComponent} from './Components/inicio-sesion/inicio-sesion.component';
import { BoletaComponent } from './Components/boleta/boleta.component';

import {ServiceService} from './Services/service.service';
import { CuboComponent } from './Components/cubo/cubo.component';


//import { DxPivotGridModule } from 'devextreme-angular';
//import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMaskModule, IConfig } from 'ngx-mask';
//import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './Templates/header/header.component';
import { LeftSidebarComponent } from './Templates/left-sidebar/left-sidebar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    //NgbPaginationModule, 
    //NgbAlertModule,
   // DxPivotGridModule,
   // NgxDropzoneModule,
     NgxMaskModule.forRoot(maskConfig),
   //NgbModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
