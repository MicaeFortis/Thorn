package com.ho.studio.springbootreacttemplate.prefix.domain;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class PrefixValidator {

  private final PrefixRepository prefixRepository;

  boolean isPrefixAlreadyUsed(Prefix prefix) {
    Prefix foundPrefix = prefixRepository.findByIdAndItemsEmpty(prefix.getId());
    return foundPrefix == null;
  }
}
