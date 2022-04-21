package com.kuntsevich.organizer.exception;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApiError {

    private final String errorMessage;
    private final String errorCode;
    private final LocalDateTime timestamp;

    public ApiError(String errorMessage, String errorCode) {
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.timestamp = LocalDateTime.now();
    }

}