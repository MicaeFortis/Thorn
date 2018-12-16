package com.ho.studio.springbootreacttemplate.service.domain;

import com.ho.studio.springbootreacttemplate.service.dto.ServiceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Component
public class ServiceFacade {

  @Autowired
  private ServiceRepository serviceRepository;

  //public ApplicationDto add(ApplicationDto applicationDto) {
  //  Application application = applicationCreator.from(applicationDto);
  //  return applicationRepository.save(application).dto();
  //}

  public ServiceDto show(Long id) {
    Optional<Service> serviceOptional = serviceRepository.findById(id);
    if (serviceOptional.isPresent()) {
      return serviceOptional.get().dto();
    }
    return new ServiceDto();
  }

  public List<ServiceDto> findAll() {
    return serviceRepository.findAll().stream().map(Service::dto).collect(Collectors.toList());
  }
}
