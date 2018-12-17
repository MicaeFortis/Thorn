package com.ho.studio.springbootreacttemplate.prefix.domain;

import com.ho.studio.springbootreacttemplate.common.Statistic;
import com.ho.studio.springbootreacttemplate.prefix.dto.PrefixDto;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by MichalPC on 11.11.2018.
 */
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
class Prefix implements Serializable {

  @Id
  @GeneratedValue
  private Long id;
  private String name;

  private double additionalValue;
  private Statistic statistic;

  PrefixDto dto() {
    return PrefixDto.builder()
                    .id(id)
                    .name(name)
                    .additionalValue(additionalValue)
                    .statistic(statistic)
                    .build();
  }

}
