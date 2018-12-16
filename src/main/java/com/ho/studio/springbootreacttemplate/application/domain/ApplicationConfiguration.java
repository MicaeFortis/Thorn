package com.ho.studio.springbootreacttemplate.application.domain;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by MichalPC on 11.11.2018.
 */
@Configuration
public class ApplicationConfiguration {

  ApplicationFacade applicationFacade() {
    return applicationFacade(new InMemoryApplicationRepository());
  }

  @Bean
  ApplicationFacade applicationFacade(ApplicationRepository applicationRepository) {
    ApplicationCreator applicationCreator = new ApplicationCreator();
    return new ApplicationFacade(applicationRepository, applicationCreator);
  }
}
