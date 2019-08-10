package com.ho.studio.springbootreacttemplate.user;

import com.ho.studio.springbootreacttemplate.user.domain.UserFacade;
import com.ho.studio.springbootreacttemplate.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static com.ho.studio.springbootreacttemplate.config.authorization.SecurityConstants.SIGN_UP_URL;

@RestController
public class UserController {

  @Autowired
  private UserFacade userFacade;

  @PostMapping(SIGN_UP_URL)
  public UserDto saveUser(@RequestBody UserDto user) {
    return userFacade.save(user);
  }
}
