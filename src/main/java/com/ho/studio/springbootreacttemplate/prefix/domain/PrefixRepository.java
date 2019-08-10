package com.ho.studio.springbootreacttemplate.prefix.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

interface PrefixRepository extends CrudRepository<Prefix, Long> {

  Collection<Prefix> findAll();

  Prefix findByIdAndItemsEmpty(Long id);
}
