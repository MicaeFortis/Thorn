package com.ho.studio.springbootreacttemplate.enemy.domain;

import com.ho.studio.springbootreacttemplate.enemy.dto.EnemyDto;
import com.ho.studio.springbootreacttemplate.item.domain.Item;
import com.ho.studio.springbootreacttemplate.item.dto.ItemDto;

import static java.util.Objects.requireNonNull;

class EnemyCreator {

  Enemy from(EnemyDto enemyDto) {
    requireNonNull(enemyDto);
    return Enemy.builder()
                .id(enemyDto.getId())
                .name(enemyDto.getName())
                .enemyType(enemyDto.getEnemyType())
                .agility(enemyDto.getAgility())
                .strength(enemyDto.getStrength())
                .intelligence(enemyDto.getIntelligence())
                .hitpoints(enemyDto.getHitPoints())
                .dead(enemyDto.isDead())
                .intelligence(enemyDto.getIntelligence())
                .build();
  }
}
