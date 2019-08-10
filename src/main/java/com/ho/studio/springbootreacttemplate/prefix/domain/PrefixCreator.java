package com.ho.studio.springbootreacttemplate.prefix.domain;

import com.ho.studio.springbootreacttemplate.prefix.dto.PrefixDto;

import static java.util.Objects.requireNonNull;

public class PrefixCreator {

  public static Prefix from(PrefixDto itemPrefixDto) {
    requireNonNull(itemPrefixDto);
    return Prefix.builder()
                 .id(itemPrefixDto.getId())
                 .name(itemPrefixDto.getName())
                 .statistic(itemPrefixDto.getStatistic())
                 .additionalValue(itemPrefixDto.getAdditionalValue())
                 .build();
  }
}
