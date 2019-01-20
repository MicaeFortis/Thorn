package com.ho.studio.springbootreacttemplate.enemy.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

interface EnemyRepository extends CrudRepository<Enemy, Long> {

  Collection<Enemy> findAll();
}
