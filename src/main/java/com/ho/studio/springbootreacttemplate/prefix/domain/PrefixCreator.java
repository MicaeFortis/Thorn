package com.ho.studio.springbootreacttemplate.prefix.domain;

import com.ho.studio.springbootreacttemplate.prefix.dto.PrefixDto;

import static java.util.Objects.requireNonNull;

/**
 * Created by MichalPC on 11.11.2018.
 */
class PrefixCreator {

  Prefix from(PrefixDto itemPrefixDto) {
    requireNonNull(itemPrefixDto);
    return Prefix.builder()
                 .id(itemPrefixDto.getId())
                 .name(itemPrefixDto.getName())
                 .statistic(itemPrefixDto.getStatistic())
                 .additionalValue(itemPrefixDto.getAdditionalValue())
                 .build();
  }
}
