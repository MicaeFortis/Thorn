package com.ho.studio.springbootreacttemplate.item.dto;

import java.util.List;

import static java.util.Arrays.asList;

public enum ItemType {
  HELMET,
  WEAPON,
  ARMOR,
  PANTS,
  GLOVES,
  NECKLACE,
  RING,
  BOOTS;

  public static List<ItemType> getItemTypes() {
    return asList(values());
  }
}
