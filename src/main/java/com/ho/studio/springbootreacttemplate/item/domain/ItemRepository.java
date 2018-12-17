package com.ho.studio.springbootreacttemplate.item.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

/**
 * Created by MichalPC on 11.11.2018.
 */
interface ItemRepository extends CrudRepository<Item, Long> {

  Collection<Item> findAll();
}
