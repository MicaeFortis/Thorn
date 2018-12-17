package com.ho.studio.springbootreacttemplate.prefix.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

/**
 * Created by MichalPC on 11.11.2018.
 */
interface PrefixRepository extends CrudRepository<Prefix, Long> {

  Collection<Prefix> findAll();
}
