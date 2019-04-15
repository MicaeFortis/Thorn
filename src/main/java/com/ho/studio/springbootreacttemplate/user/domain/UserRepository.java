package com.ho.studio.springbootreacttemplate.user.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

interface UserRepository extends CrudRepository<User, Long> {

  User findUserByUsername(String username);
}
