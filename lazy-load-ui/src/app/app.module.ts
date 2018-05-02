import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { InfoEntradaComponent } from './components/info-entrada/info-entrada.component';
import { UploadFileService } from './services/upload-file.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons'
import { InputFileModule } from 'ngx-input-file';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-alerts';
import {BusyModule} from 'ngx-busy';
import { InfoEntradaDetalleComponent } from './components/info-entrada-detalle/info-entrada-detalle.component';



@NgModule({
  declarations: [
    AppComponent,
    InfoEntradaComponent,
    InfoEntradaDetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ButtonsModule.forRoot(),
    InputFileModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 10000}),
    BusyModule,
  ],
  providers: [UploadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
