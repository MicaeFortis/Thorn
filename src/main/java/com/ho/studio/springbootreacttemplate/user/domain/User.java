package com.ho.studio.springbootreacttemplate.user.domain;


import com.ho.studio.springbootreacttemplate.user.dto.UserDto;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "app_user")
@Entity
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  Long id;

  @NotEmpty
  private String username;

  @NotEmpty
  private String password;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "user_role", joinColumns
      = @JoinColumn(name = "user_id",
      referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "role_id",
          referencedColumnName = "id"))
  private List<Role> roles;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return roles.stream().map(Role::getRoleName)
         .map(SimpleGrantedAuthority::new)
         .collect(toList());
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public UserDto dto() {
    return UserDto.builder()
        .id(id)
        .username(username)
        .password(password)
        .build();
  }
}
