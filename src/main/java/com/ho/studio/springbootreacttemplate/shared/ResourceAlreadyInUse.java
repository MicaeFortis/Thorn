package com.ho.studio.springbootreacttemplate.shared;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ResourceAlreadyInUse extends RuntimeException {

  private static final String IS_ALREADY_IN_USE = " is already in use";

  public ResourceAlreadyInUse(String resourceName) {
    super(resourceName + IS_ALREADY_IN_USE);
  }
}
