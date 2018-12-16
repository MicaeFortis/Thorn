package com.ho.studio.springbootreacttemplate.application.domain;

import com.ho.studio.springbootreacttemplate.application.dto.ApplicationDto;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

/**
 * Created by MichalPC on 11.11.2018.
 */
@Transactional
public class ApplicationFacade {
  private ApplicationRepository applicationRepository;
  private ApplicationCreator applicationCreator;

  ApplicationFacade(ApplicationRepository applicationRepository, ApplicationCreator applicationCreator) {
    this.applicationRepository = applicationRepository;
    this.applicationCreator = applicationCreator;
  }

  public ApplicationDto add(ApplicationDto applicationDto) {
    Application application = applicationCreator.from(applicationDto);
    return applicationRepository.save(application).dto();
  }

  public ApplicationDto show(String id) {
    return applicationRepository.findOneByIdOrThrow(id).dto();
  }

  public Collection<ApplicationDto> findAll() {
    return applicationRepository.findAll().stream().map(Application::dto).collect(toList());
  }
}
