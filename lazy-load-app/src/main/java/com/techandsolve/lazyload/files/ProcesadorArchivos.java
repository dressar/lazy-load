package com.techandsolve.lazyload.files;

import com.techandsolve.lazyload.exceptions.BusinessException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProcesadorArchivos {

    public List<String> obtenerContenidoArchivo(MultipartFile archivo) throws BusinessException{
        if(archivo!=null){
            try {
                return new BufferedReader(new InputStreamReader(archivo.getInputStream()))
                        .lines().collect(Collectors.toList());
            } catch (IOException e) {
                throw new BusinessException("Error obteniendo el contenido del archivo cargado: "+archivo.getOriginalFilename(),e);
            }
        }
        throw new BusinessException("Error obteniendo el contenido del archivo cargado: el archivo es nulo");
    }
}
