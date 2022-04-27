package com.kuntsevich.organizer.exception;

public class OperationForbiddenException extends Exception {

    public OperationForbiddenException() {
        super();
    }

    public OperationForbiddenException(String message) {
        super(message);
    }

    public OperationForbiddenException(String message, Throwable cause) {
        super(message, cause);
    }

    public OperationForbiddenException(Throwable cause) {
        super(cause);
    }

    protected OperationForbiddenException(String message,
                                          Throwable cause,
                                          boolean enableSuppression,
                                          boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
