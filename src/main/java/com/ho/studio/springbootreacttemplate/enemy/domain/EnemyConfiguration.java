package com.ho.studio.springbootreacttemplate.enemy.domain;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnemyConfiguration {

  @Bean
  EnemyFacade enemyFacade(EnemyRepository enemyRepository) {
    EnemyCreator enemyCreator = new EnemyCreator();
    return new EnemyFacade(enemyRepository, enemyCreator);
  }
}
