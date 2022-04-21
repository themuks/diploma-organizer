package com.kuntsevich.organizer.exception;

import lombok.Getter;

@Getter
public class ControllerException extends RuntimeException {

    private final String entityCode;

    public ControllerException(String message, String entityCode) {
        super(message);
        this.entityCode = entityCode;
    }

}
