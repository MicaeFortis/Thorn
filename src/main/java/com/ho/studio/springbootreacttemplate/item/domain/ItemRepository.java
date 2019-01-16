package com.ho.studio.springbootreacttemplate.item.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

interface ItemRepository extends CrudRepository<Item, Long> {

  Collection<Item> findAll();
}
