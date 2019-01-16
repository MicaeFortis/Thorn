package com.ho.studio.springbootreacttemplate.prefix.domain;

import com.ho.studio.springbootreacttemplate.prefix.dto.Statistic;

import java.util.Collection;

import static java.util.Arrays.asList;

public class StatisticFacade {

  public Collection<Statistic> getStatistics() {
    return asList(Statistic.values());
  }
}
