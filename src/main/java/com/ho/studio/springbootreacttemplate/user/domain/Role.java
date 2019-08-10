package com.ho.studio.springbootreacttemplate.user.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "app_role")
@Getter
@Setter
public class Role {

  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String roleName;

  private String description;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "user_role", joinColumns
      = @JoinColumn(name = "role_id",
      referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "user_id",
          referencedColumnName = "id"))
  private List<User> users;
}
