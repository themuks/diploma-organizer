package com.kuntsevich.organizer.exception;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApiResponse {

    private final String errorMessage;
    private final String errorCode;
    private final LocalDateTime timestamp;

    public ApiResponse(String errorMessage, String errorCode) {
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.timestamp = LocalDateTime.now();
    }

}