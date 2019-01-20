package com.ho.studio.springbootreacttemplate.prefix.domain;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PrefixConfiguration {

  @Bean PrefixFacade prefixFacade(PrefixRepository prefixRepository) {
    PrefixCreator prefixCreator = new PrefixCreator();
    return new PrefixFacade(prefixRepository, prefixCreator);
  }
}
