package com.ho.studio.springbootreacttemplate.prefix.dto;

import com.ho.studio.springbootreacttemplate.common.Statistic;
import lombok.*;

/**
 * Created by MichalPC on 11.11.2018.
 */
@Builder
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class PrefixDto {
  private Long id;
  private String name;
  private double additionalValue;
  private Statistic statistic;
}
