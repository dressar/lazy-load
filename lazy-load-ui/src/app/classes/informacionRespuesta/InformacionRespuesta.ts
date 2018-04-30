import { InformacionProceso } from './informacionProceso'

export class InformacionRespuesta{
    mensaje: string;
    listaProcesos: Array<InformacionProceso>;
    idTrabajador: string;
}