package com.ho.studio.springbootreacttemplate.service.domain;

import com.ho.studio.springbootreacttemplate.application.dto.ApplicationDto;
import com.ho.studio.springbootreacttemplate.service.dto.ServiceDto;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Created by MichalPC on 11.11.2018.
 */
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
class Service implements Serializable {

  @Id
  @GeneratedValue
  private Long id;
  private String name;
  private float workMinutes;
  private BigDecimal price;

  ServiceDto dto() {
    return ServiceDto.builder()
                     .id(id)
                     .name(name)
                     .workMinutes(workMinutes)
                     .price(price)
                     .build();
  }
}
