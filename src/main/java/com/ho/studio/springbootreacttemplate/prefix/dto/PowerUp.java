package com.ho.studio.springbootreacttemplate.prefix.dto;

import java.io.Serializable;
import java.util.List;

import static java.util.Arrays.asList;

public enum PowerUp implements Serializable {
  DAMAGE,
  EVASION,
  DEFENSE,
  WISDOM;

  public static List<PowerUp> getPowerUps() {
    return asList(values());
  }
}
