package com.ho.studio.springbootreacttemplate.application.dto;

/**
 * Created by MichalPC on 11.11.2018.
 */
public class ApplicationNotFoundException extends RuntimeException {

  public ApplicationNotFoundException(String id) {
    super("Application with id " + id + " not found!");
  }
}
