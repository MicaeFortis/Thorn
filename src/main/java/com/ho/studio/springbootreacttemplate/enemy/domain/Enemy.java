package com.ho.studio.springbootreacttemplate.enemy.domain;

import com.ho.studio.springbootreacttemplate.common.Being;
import com.ho.studio.springbootreacttemplate.enemy.dto.EnemyDto;
import com.ho.studio.springbootreacttemplate.enemy.dto.EnemyType;
import com.ho.studio.springbootreacttemplate.item.dto.ItemDto;
import com.ho.studio.springbootreacttemplate.item.dto.ItemType;
import com.ho.studio.springbootreacttemplate.prefix.domain.Prefix;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.util.Collection;

import static java.util.Arrays.asList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Enemy extends Being implements Serializable {

  @Builder
  Enemy(Long id, EnemyType enemyType, String name, double agility, double strength, double intelligence, boolean dead, double hitpoints) {
    super(id, name, strength, agility, intelligence, hitpoints, dead);
    this.enemyType = enemyType;
  }

  private EnemyType enemyType;

  EnemyDto dto() {
    return EnemyDto.builder()
                   .agility(getAgility())
                   .strength(getStrength())
                   .dead(isDead())
                   .intelligence(getIntelligence())
                   .enemyType(getEnemyType())
                   .hitPoints(getHitPoints())
                   .id(getId())
                   .name(getName())
                   .build();
  }
}
