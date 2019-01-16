package com.ho.studio.springbootreacttemplate.item.dto;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Builder
@Getter
@EqualsAndHashCode
public class ItemDto {
  private Long id;
  private String name;
  private double strengthRequired;
  private double agilityRequired;
  private double intelligenceRequired;
  private double strengthGiven;
  private double agilityGiven;
  private double intelligenceGiven;
}
