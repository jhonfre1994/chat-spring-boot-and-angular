package com.app.chatBack.exceptions;

import lombok.Getter;

@Getter
public enum ErrorCode {
  ERROR_SAVE_FILE_OPENAI("Error creating file in Open Ai", 400),
  ERROR_EMPTY_FILE("The file can not be empty", 400),
  ERROR_IO_EXCEPTION("Error reading file in response", 500),
  ERROR_SAVE_THREAD_OPENAI("Error creating thread in Open Ai", 400),
  ERROR_RUN_THREAD_OPENAI("Error run thread in Open Ai", 400),
  BAD_REQUEST("bad request", 400),
  NOT_FOUND("not found", 404),
  UNAUTHORIZED_TOKEN("Authentication error", 401),
  NO_CONTENT("No Content", 204),
  INTERNAL_ERROR("Internal Error", 500),
  ERROR_RUN_ASSISTANT("Error run assistant", 500),
  ;

  private String errorMessage;
  private int statusCode;

  ErrorCode(String errorMessage, int statusCode) {
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }


}