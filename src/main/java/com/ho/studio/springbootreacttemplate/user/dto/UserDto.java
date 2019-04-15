package com.ho.studio.springbootreacttemplate.user.dto;

import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {

  private Long id;
  private String username;
  private String password;
}
