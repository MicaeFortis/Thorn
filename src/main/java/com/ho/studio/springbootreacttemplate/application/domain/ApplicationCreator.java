package com.ho.studio.springbootreacttemplate.application.domain;

import com.ho.studio.springbootreacttemplate.application.dto.ApplicationDto;


import static java.util.Objects.requireNonNull;

/**
 * Created by MichalPC on 11.11.2018.
 */
class ApplicationCreator {
  Application from(ApplicationDto applicationDto) {
    requireNonNull(applicationDto);
    return Application.builder().name(applicationDto.getName())
               .creatorName(applicationDto.getCreatorName())
               .price(applicationDto.getPrice())
               .build();
  }

}
