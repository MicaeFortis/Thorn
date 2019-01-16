package com.ho.studio.springbootreacttemplate.prefix;

import com.ho.studio.springbootreacttemplate.prefix.domain.StatisticFacade;
import com.ho.studio.springbootreacttemplate.prefix.dto.Statistic;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class StatisticController {
  private StatisticFacade statisticFacade;

  public StatisticController(StatisticFacade statisticFacade) {
    this.statisticFacade = statisticFacade;
  }

  @GetMapping("/api/statistics")
  public Collection<Statistic> getStatistics() {
    return statisticFacade.getStatistics();
  }
}
