package com.ho.studio.springbootreacttemplate.item.domain;

import com.ho.studio.springbootreacttemplate.item.dto.ItemDto;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
class Item implements Serializable {

  @Id
  @GeneratedValue
  private Long id;
  private String name;
  private double strengthRequired;
  private double agilityRequired;
  private double intelligenceRequired;
  private double strengthGiven;
  private double agilityGiven;
  private double intelligenceGiven;

  ItemDto dto() {
    return ItemDto.builder()
                  .id(id)
                  .name(name)
                  .strengthRequired(strengthRequired)
                  .strengthGiven(strengthGiven)
                  .agilityGiven(agilityGiven)
                  .agilityRequired(agilityRequired)
                  .intelligenceGiven(intelligenceGiven)
                  .intelligenceRequired(intelligenceRequired)
                  .build();
  }

}
