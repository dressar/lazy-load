import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable' 
import { InformacionRespuesta } from '../classes/informacionRespuesta/InformacionRespuesta';

@Injectable()
export class UploadFileService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File, idTrabajador: string): Observable<any>{
    let formData: FormData = new FormData();
   
    formData.append('file', file);
    formData.append('idTrabajador', idTrabajador);
   
    return this.http.post<InformacionRespuesta>('/uploadfile', formData);
  }

  obtenerArchivoProceso(idProceso: string){
    return this.http.get<string>('/downloadfile/'+idProceso);
  }

}
