package com.ho.studio.springbootreacttemplate.service.dto;

import lombok.*;

import java.math.BigDecimal;

/**
 * Created by MichalPC on 11.11.2018.
 */
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ServiceDto {
  private Long id;
  private String name;
  private float workMinutes;
  private BigDecimal price;
}
