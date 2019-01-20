package com.ho.studio.springbootreacttemplate.prefix.domain;

import com.ho.studio.springbootreacttemplate.item.domain.Item;
import com.ho.studio.springbootreacttemplate.prefix.dto.PowerUp;
import com.ho.studio.springbootreacttemplate.prefix.dto.PrefixDto;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.util.Collection;

import static java.util.Arrays.asList;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Prefix implements Serializable {

  @Id
  @GeneratedValue
  private Long id;
  private String name;

  private double additionalValue;
  private PowerUp statistic;

  @OneToOne
  private Item item;

  PrefixDto dto() {
    return PrefixDto.builder()
                    .id(id)
                    .name(name)
                    .additionalValue(additionalValue)
                    .statistic(statistic)
                    .build();
  }

  static Collection<PowerUp> getPowerUps() {
    return asList(PowerUp.values());
  }
}
