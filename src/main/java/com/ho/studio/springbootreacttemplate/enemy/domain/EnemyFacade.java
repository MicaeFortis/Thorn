package com.ho.studio.springbootreacttemplate.enemy.domain;

import com.ho.studio.springbootreacttemplate.enemy.dto.EnemyDto;
import com.ho.studio.springbootreacttemplate.enemy.dto.EnemyType;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Transactional
public class EnemyFacade {
  private EnemyRepository enemyRepository;
  private EnemyCreator enemyCreator;

  EnemyFacade(EnemyRepository enemyRepository,
              EnemyCreator enemyCreator) {
    this.enemyRepository = enemyRepository;
    this.enemyCreator = enemyCreator;
  }

  public EnemyDto show(Long id) {
    Optional<Enemy> enemy = enemyRepository.findById(id);
    return enemy.map(Enemy::dto).orElse(null);
  }

  public void delete(EnemyDto itemDto) {
    Enemy item = enemyCreator.from(itemDto);
    enemyRepository.delete(item);
  }

  public EnemyDto save(EnemyDto itemDto) {
    Enemy item = enemyCreator.from(itemDto);
    return enemyRepository.save(item).dto();
  }

  public Collection<EnemyDto> findAll() {
    return enemyRepository.findAll().stream().map(Enemy::dto).collect(toList());
  }

  public Collection<EnemyType> getItemTypes() {
    return EnemyType.getEnemyTypes();
  }
}
