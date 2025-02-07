package com.app.chatBack.exceptions;

import lombok.Getter;

/**
 * Class containing relevant information from an API call error.
 * */
@Getter
public class ApiError {

    private String error;
    private Integer status;

    public ApiError(String error, Integer status) {
        this.error = error;
        this.status = status;
    }

}
