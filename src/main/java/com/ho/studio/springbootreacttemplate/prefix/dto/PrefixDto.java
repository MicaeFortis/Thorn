package com.ho.studio.springbootreacttemplate.prefix.dto;

import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class PrefixDto implements Serializable {
  private Long id;
  private String name;
  private double additionalValue;
  private PowerUp statistic;
}
