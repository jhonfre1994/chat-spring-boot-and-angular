package com.app.chatBack.exceptions;

import lombok.Getter;

@Getter
public class ApiException extends Exception {

    private String code;
    private String description;
    private Integer statusCode;

    public ApiException(String code, String description, Integer statusCode, Throwable cause) {
        super(description, cause);
        this.code = code;
        this.description = description;
        this.statusCode = statusCode;
    }

    public ApiException(String description, Integer statusCode) {
        super(description);
        this.description = description;
        this.statusCode = statusCode;
    }

}