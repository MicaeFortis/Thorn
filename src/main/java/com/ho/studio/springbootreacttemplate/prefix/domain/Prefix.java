package com.ho.studio.springbootreacttemplate.prefix.domain;

import lombok.*;

import com.ho.studio.springbootreacttemplate.item.domain.Item;
import com.ho.studio.springbootreacttemplate.prefix.dto.PowerUp;
import com.ho.studio.springbootreacttemplate.prefix.dto.PrefixDto;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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

  @OneToMany(mappedBy = "prefix")
  private List<Item> items;

  public PrefixDto dto() {
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
