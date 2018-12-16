package com.ho.studio.springbootreacttemplate.service.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
interface ServiceRepository extends CrudRepository<Service, String> {
  Collection<Service> findAll();
  Optional<Service> findById(Long id);
}
