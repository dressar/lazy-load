package com.techandsolve.lazyload.business;

import com.techandsolve.lazyload.business.collectors.LazyLoadCollector;
import com.techandsolve.lazyload.dto.InformacionProceso;
import com.techandsolve.lazyload.dto.InformacionRespuesta;
import com.techandsolve.lazyload.entities.ProcesoLazyLoad;
import com.techandsolve.lazyload.exceptions.BusinessException;
import com.techandsolve.lazyload.files.ProcesadorArchivos;
import com.techandsolve.lazyload.repositories.ProcesoLazyLoadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class ProcesadorLazyLoad {
    private static final Logger LOGGER = Logger.getLogger( ProcesadorLazyLoad.class.getName() );

    @Autowired
    private ProcesoLazyLoadRepository procesoLazyLoadRepository;

    @Autowired
    private ProcesadorArchivos procesadorArchivos;

    public InformacionRespuesta procesarLazyLoad(String idTrabajador, MultipartFile archivo) throws BusinessException {
        if(idTrabajador!=null && !idTrabajador.isEmpty() && archivo!=null){
            List<String> listaCasos = procesadorArchivos.obtenerContenidoArchivo(archivo).stream()
                    .map(Integer::valueOf).collect(new LazyLoadCollector());
            ProcesoLazyLoad procesoLazyLoad = procesarContenidoArchivo(idTrabajador,listaCasos,archivo.getOriginalFilename());
            procesoLazyLoadRepository.save(procesoLazyLoad);
            List<ProcesoLazyLoad> listaProcesosTrabajador = procesoLazyLoadRepository.findByIdTrabajador(idTrabajador)
                    .stream().sorted(Comparator.comparing(ProcesoLazyLoad::getFechaEjecucion).reversed())
                    .collect(Collectors.toList());
            return obtenerRespuesta(listaProcesosTrabajador);
        }
        throw new BusinessException("Los parametros de entrada no son validos");
    }

   private InformacionRespuesta obtenerRespuesta(List<ProcesoLazyLoad> listaProcesosTrabajador) {
        InformacionRespuesta respuesta = new InformacionRespuesta();
        respuesta.setListaProcesos(listaProcesosTrabajador.stream().map(getProcesoLazyLoadInformacionProcesoFunction())
                .collect(Collectors.toList()));
        return respuesta;
    }

    private Function<ProcesoLazyLoad, InformacionProceso> getProcesoLazyLoadInformacionProcesoFunction() {
        return proceso -> new InformacionProceso(proceso.getFechaEjecucion().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                proceso.getIdTrabajador(),
                proceso.getNombreArchivoCargado(),proceso.getId());
    }

    private ProcesoLazyLoad procesarContenidoArchivo(String idTrabajador, List<String> contenidoArchivo,
                                                     String nombreArchivoCargado) throws BusinessException {

        ProcesoLazyLoad procesoLazyLoad = new ProcesoLazyLoad();
        procesoLazyLoad.setCasosProcesados(contenidoArchivo.stream().collect(Collectors.joining(",")));
        procesoLazyLoad.setFechaEjecucion(LocalDateTime.now());
        procesoLazyLoad.setIdTrabajador(idTrabajador);
        procesoLazyLoad.setNombreArchivoCargado(nombreArchivoCargado);
        return procesoLazyLoad;
    }

    public List<String> obtenerInformacionRespuesta(String idProceso) throws BusinessException {
        if(idProceso!=null && !idProceso.isEmpty()){
            ProcesoLazyLoad proceso = procesoLazyLoadRepository.findById(idProceso).orElse(null);

            if(proceso!=null){
                AtomicInteger atomicInteger = new AtomicInteger(0);
                return Stream.of(proceso.getCasosProcesados().split(","))
                        .map(caso ->{
                            return mapCasosProcesadosToList(caso,atomicInteger.incrementAndGet());
                        }).collect(Collectors.toList());
            }
            throw new BusinessException("No existe un proceso con el id: "+idProceso);
        }
        throw new BusinessException("Error obteniendo el archivo");
    }

    private String mapCasosProcesadosToList(String caso, Integer numeroCaso) {
        return "Case #".concat(numeroCaso.toString()).concat(": ").concat(caso).concat(System.lineSeparator());
    }
}
