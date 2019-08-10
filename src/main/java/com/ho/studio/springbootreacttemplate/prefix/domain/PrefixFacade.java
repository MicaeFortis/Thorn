package com.ho.studio.springbootreacttemplate.prefix.domain;

import com.ho.studio.springbootreacttemplate.prefix.dto.PowerUp;
import com.ho.studio.springbootreacttemplate.prefix.dto.PrefixDto;
import lombok.RequiredArgsConstructor;

import com.ho.studio.springbootreacttemplate.shared.ResourceAlreadyInUse;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Component
@RequiredArgsConstructor
@Transactional
public class PrefixFacade {
  private final PrefixRepository prefixRepository;
  private final PrefixValidator prefixValidator;

  public PrefixDto add(PrefixDto prefixDto) {
    Prefix prefix = PrefixCreator.from(prefixDto);
    return prefixRepository.save(prefix).dto();
  }

  public PrefixDto show(Long id) {
    Optional<Prefix> itemPrefix = prefixRepository.findById(id);
    return itemPrefix.map(Prefix::dto).orElse(null);
  }

  public void delete(PrefixDto prefixDto) {
    Prefix prefix = PrefixCreator.from(prefixDto);
    if (prefixValidator.isPrefixAlreadyUsed(prefix)) {
      throw new ResourceAlreadyInUse("Prefix");
    }

    prefixRepository.delete(prefix);
  }

  public PrefixDto save(PrefixDto prefixDto) {
    Prefix prefix = PrefixCreator.from(prefixDto);
    return prefixRepository.save(prefix).dto();
  }

  public Collection<PrefixDto> findAll() {
    return prefixRepository.findAll().stream().map(Prefix::dto).collect(toList());
  }

  public Collection<PowerUp> getPowerUps() {
    return Prefix.getPowerUps();
  }
}
