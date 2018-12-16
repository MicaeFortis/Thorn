package com.ho.studio.springbootreacttemplate.service.domain;

import com.ho.studio.springbootreacttemplate.service.dto.ServiceDto;

import static java.util.Objects.requireNonNull;

class ServiceCreator {

  Service from(ServiceDto serviceDto) {
    requireNonNull(serviceDto);
    return Service.builder().id(serviceDto.getId())
                  .name(serviceDto.getName())
                  .workMinutes(serviceDto.getWorkMinutes())
                  .price(serviceDto.getPrice())
                  .build();
  }
}