package com.ho.studio.springbootreacttemplate.enemy.dto;

import java.util.List;
import static java.util.Arrays.asList;

public enum EnemyType {
  ANIMAL,
  VAMPIRE,
  MONSTER,
  GHOST;

  public static List<EnemyType> getEnemyTypes() {
    return asList(values());
  }
}
