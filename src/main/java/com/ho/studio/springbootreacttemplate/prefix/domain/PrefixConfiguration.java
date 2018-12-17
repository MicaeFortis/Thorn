package com.ho.studio.springbootreacttemplate.prefix.domain;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by MichalPC on 11.11.2018.
 */
@Configuration
public class PrefixConfiguration {

  @Bean PrefixFacade prefixFacade(PrefixRepository prefixRepository) {
    PrefixCreator prefixCreator = new PrefixCreator();
    return new PrefixFacade(prefixRepository, prefixCreator);
  }
}
