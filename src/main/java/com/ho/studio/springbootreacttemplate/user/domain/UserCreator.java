package com.ho.studio.springbootreacttemplate.user.domain;

import com.ho.studio.springbootreacttemplate.user.dto.UserDto;

import static java.util.Objects.requireNonNull;

public class UserCreator {

  User from(UserDto userDto) {
    requireNonNull(userDto);
    return User.builder()
                 .id(userDto.getId())
                 .username(userDto.getUsername())
                 .password(userDto.getPassword())
                 .build();
  }
}
