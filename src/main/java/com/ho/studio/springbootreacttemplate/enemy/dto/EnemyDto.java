package com.ho.studio.springbootreacttemplate.enemy.dto;

import com.ho.studio.springbootreacttemplate.item.dto.ItemType;
import com.ho.studio.springbootreacttemplate.prefix.domain.Prefix;
import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class EnemyDto implements Serializable {

  private Long id;
  private String name;
  private double strength;
  private double agility;
  private double intelligence;

  private double hitPoints;
  private boolean dead;
  private EnemyType enemyType;
}
