package com.ho.studio.springbootreacttemplate.service;

import com.ho.studio.springbootreacttemplate.application.domain.ApplicationFacade;
import com.ho.studio.springbootreacttemplate.application.dto.ApplicationDto;
import com.ho.studio.springbootreacttemplate.service.domain.ServiceFacade;
import com.ho.studio.springbootreacttemplate.service.dto.ServiceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

/**
 * Created by MichalPC on 12.11.2018.
 */
@RestController
public class ServiceController {

  @Autowired
  private ServiceFacade serviceFacade;

  @GetMapping("/api/services")
  public Collection<ServiceDto> getServices() {
    return serviceFacade.findAll();
  }

  @GetMapping("/api/services/{id}")
  public ServiceDto getService(@PathVariable Long id) {
    return serviceFacade.show(id);
  }


}
