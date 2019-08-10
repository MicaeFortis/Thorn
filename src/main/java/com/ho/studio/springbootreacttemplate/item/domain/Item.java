package com.ho.studio.springbootreacttemplate.item.domain;

import com.ho.studio.springbootreacttemplate.item.dto.ItemDto;
import com.ho.studio.springbootreacttemplate.item.dto.ItemType;
import com.ho.studio.springbootreacttemplate.prefix.domain.Prefix;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

import static java.util.Arrays.asList;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Item implements Serializable {

  @Id
  @GeneratedValue
  private Long id;
  private String name;
  private double strengthRequired;
  private double agilityRequired;
  private double intelligenceRequired;
  private double damage;
  private double defense;
  private double evasion;
  private double wisdom;
  private ItemType itemType;

  @ManyToOne
  @JoinColumn(name = "prefix_id")
  private Prefix prefix;

  ItemDto dto() {
    return ItemDto.builder()
                  .id(id)
                  .name(name)
                  .strengthRequired(strengthRequired)
                  .damage(damage)
                  .evasion(evasion)
                  .defense(defense)
                  .agilityRequired(agilityRequired)
                  .wisdom(wisdom)
                  .intelligenceRequired(intelligenceRequired)
                  .itemType(itemType)
                  .prefix(prefix.dto())
                  .build();
  }
}
