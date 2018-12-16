package com.ho.studio.springbootreacttemplate.application.dto;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.math.BigDecimal;

/**
 * Created by MichalPC on 11.11.2018.
 */
@Builder
@Getter
@EqualsAndHashCode
public class ApplicationDto {
  private Long id;
  private String name;
  private String creatorName;
  private BigDecimal price;
}
