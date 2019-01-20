package com.ho.studio.springbootreacttemplate.character.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

interface CharacterRepository extends CrudRepository<Character, Long> {

  Collection<Character> findAll();
}
