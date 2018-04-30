import { Component, OnInit, Input } from '@angular/core';
import { InformacionRespuesta } from '../../classes/informacionRespuesta/InformacionRespuesta'
import { UploadFileService } from '../../services/upload-file.service';
import { InformacionProceso } from '../../classes/informacionRespuesta/informacionProceso';
import { AlertService } from 'ngx-alerts';
import { Subscription } from 'rxjs/Subscription';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-info-entrada-detalle',
  templateUrl: './info-entrada-detalle.component.html',
  styleUrls: ['./info-entrada-detalle.component.css']
})
export class InfoEntradaDetalleComponent implements OnInit {
  @Input()informacionRespuesta: InformacionRespuesta;
 thingsSubscription: Subscription;
  
  constructor(private uploadService: UploadFileService,private alertService: AlertService) { }

  mapRespuetaToString(data: any): String {
    var contenido = new String('');
    for(let entry of data){
      contenido=contenido.concat(entry);
    }
    return contenido;
  }
  generarArchivo(data: any): any {
    var data2 = this.mapRespuetaToString(data);
    var blob = new Blob([data2], { type: 'text/plain' });
    saveAs(blob,'lazy_loading_example_output.txt'); 
  }
    

  
  descargarArchivo(idProceso: string){
    console.log('Proceso: ',idProceso);
    
    this.thingsSubscription = this.uploadService.obtenerArchivoProceso(idProceso)
    .subscribe(data=>{
      this.generarArchivo(data);
    },()=>this.alertService.danger('error inesperado')
    ,()=>this.alertService.success('Archivo descargado correctamente'));
  }
  
  ngOnInit() {
  }
}
