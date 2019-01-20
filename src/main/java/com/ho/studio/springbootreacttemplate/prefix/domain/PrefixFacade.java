package com.ho.studio.springbootreacttemplate.prefix.domain;

import com.ho.studio.springbootreacttemplate.prefix.dto.PowerUp;
import com.ho.studio.springbootreacttemplate.prefix.dto.PrefixDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Transactional
public class PrefixFacade {
  private PrefixRepository prefixRepository;
  private PrefixCreator prefixCreator;

  PrefixFacade(PrefixRepository prefixRepository,
               PrefixCreator prefixCreator) {
    this.prefixRepository = prefixRepository;
    this.prefixCreator = prefixCreator;
  }

  public PrefixDto add(PrefixDto prefixDto) {
    Prefix prefix = prefixCreator.from(prefixDto);
    return prefixRepository.save(prefix).dto();
  }

  public PrefixDto show(Long id) {
    Optional<Prefix> itemPrefix = prefixRepository.findById(id);
    return itemPrefix.map(Prefix::dto).orElse(null);
  }

  public void delete(PrefixDto prefixDto) {
    Prefix prefix = prefixCreator.from(prefixDto);
    prefixRepository.delete(prefix);
  }

  public PrefixDto save(PrefixDto prefixDto) {
    Prefix prefix = prefixCreator.from(prefixDto);
    return prefixRepository.save(prefix).dto();
  }

  public Collection<PrefixDto> findAll() {
    return prefixRepository.findAll().stream().map(Prefix::dto).collect(toList());
  }

  public Collection<PowerUp> getPowerUps() {
    return Prefix.getPowerUps();
  }
}
