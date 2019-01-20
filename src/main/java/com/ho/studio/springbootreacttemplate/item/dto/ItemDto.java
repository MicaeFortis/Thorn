package com.ho.studio.springbootreacttemplate.item.dto;

import com.ho.studio.springbootreacttemplate.prefix.domain.Prefix;
import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto implements Serializable {
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
  private Prefix prefix;
}
