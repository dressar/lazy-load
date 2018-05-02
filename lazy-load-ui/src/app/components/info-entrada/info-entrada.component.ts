import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoEntrada } from '../../classes/informacionEntrada/infoEntrada'
import { UploadFileService } from '../../services/upload-file.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { AlertService } from 'ngx-alerts'
import { Subscription } from 'rxjs/Subscription';
import { InformacionRespuesta } from '../../classes/informacionRespuesta/InformacionRespuesta';

@Component({
  selector: 'app-info-entrada',
  templateUrl: './info-entrada.component.html',
  styleUrls: ['./info-entrada.component.css']
})
export class InfoEntradaComponent implements OnInit {
  thingsSubscription: Subscription;
  selectedFiles: FileList;
  currentFileUpload: File;
  infoEntrada: InfoEntrada = new InfoEntrada();
  mensajeEjecucion: string;
  informacionRespuesta: InformacionRespuesta;
  idTrabajador: string;
  
  @ViewChild('inputArchivo')
  inputArchivoVar:any;
  
  constructor(private uploadService: UploadFileService,private alertService: AlertService) { }
  
  ngOnInit() {}
  
  selectFile(event){
    console.log('archivos seleccionados: ',event.target.files)
    if(event.target.files.length>0){
      this.selectedFiles = event.target.files;
    }
  }
  
  upload(){
    this.currentFileUpload = this.selectedFiles.item(0);
    this.thingsSubscription = this.uploadService.pushFileToStorage(this.currentFileUpload, this.infoEntrada.idTrabajador)
    .subscribe(informacionRespuesta => {
        if(informacionRespuesta && informacionRespuesta.listaProcesos){
          this.alertService.success(informacionRespuesta.mensaje);
          this.informacionRespuesta = informacionRespuesta;
          this.informacionRespuesta.idTrabajador = Object.assign({}, this.infoEntrada.idTrabajador);
          this.resetInformacionEntrada();
        }else{
          this.alertService.danger(informacionRespuesta.mensaje);
        }
      },error=>{
        this.alertService.danger('Ha ocurrido un error inesperado, contacte al área de soporte!');
        console.log('error: ',error);
      });
    }
    
    resetInformacionEntrada(): any {
      this.selectedFiles = undefined;
      this.currentFileUpload = undefined;
      this.inputArchivoVar.nativeElement.value = "";
      this.infoEntrada = new InfoEntrada();
    }
  }
  