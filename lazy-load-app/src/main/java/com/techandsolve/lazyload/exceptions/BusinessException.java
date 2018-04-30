package com.techandsolve.lazyload.exceptions;

public class BusinessException extends Exception {
    public BusinessException(String mensaje, Exception e) {
        super(mensaje,e);
    }

    public BusinessException(String mensaje) {
        super(mensaje);
    }
}
