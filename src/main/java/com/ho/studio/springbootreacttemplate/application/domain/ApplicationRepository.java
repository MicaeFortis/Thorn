package com.ho.studio.springbootreacttemplate.application.domain;

import com.ho.studio.springbootreacttemplate.application.dto.ApplicationDto;
import com.ho.studio.springbootreacttemplate.application.dto.ApplicationNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.Optional;
import java.util.List;
/**
 * Created by MichalPC on 11.11.2018.
 */
interface ApplicationRepository extends CrudRepository<Application, String> {

  Collection<Application> findAll();

  default Application findOneByIdOrThrow(String id) {
    Optional<Application> application = findById(id);
    if (!application.isPresent()) {
      throw new ApplicationNotFoundException(id);
    }
    return application.get();
  }
}
