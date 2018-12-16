package com.ho.studio.springbootreacttemplate.application;

import com.ho.studio.springbootreacttemplate.application.domain.ApplicationConfiguration;
import com.ho.studio.springbootreacttemplate.application.domain.ApplicationFacade;
import com.ho.studio.springbootreacttemplate.application.dto.ApplicationDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

/**
 * Created by MichalPC on 12.11.2018.
 */
@RestController
public class ApplicationController {
  private ApplicationFacade applicationFacade;

  public ApplicationController(ApplicationFacade applicationFacade) {
    this.applicationFacade = applicationFacade;
  }

  @GetMapping("/api/applications")
  public Collection<ApplicationDto> getApplications() {
    return applicationFacade.findAll();
  }
}
