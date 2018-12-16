package com.ho.studio.springbootreacttemplate.application.domain;

import com.ho.studio.springbootreacttemplate.application.dto.ApplicationDto;
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
class Application implements Serializable {

  @Id
  @GeneratedValue
  private Long id;
  private String name;
  private String creatorName;
  private BigDecimal price;

  ApplicationDto dto() {
    return ApplicationDto.builder().name(name)
                  .creatorName(creatorName)
                  .price(price)
                  .build();
  }

}
