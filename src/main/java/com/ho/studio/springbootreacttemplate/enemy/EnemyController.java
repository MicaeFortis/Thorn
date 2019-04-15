package com.ho.studio.springbootreacttemplate.enemy;

import com.ho.studio.springbootreacttemplate.enemy.domain.EnemyFacade;
import com.ho.studio.springbootreacttemplate.enemy.dto.EnemyDto;
import com.ho.studio.springbootreacttemplate.enemy.dto.EnemyType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class EnemyController {

  @Autowired
  private EnemyFacade enemyFacade;

  @GetMapping("/api/enemies")
  public Collection<EnemyDto> getEnemies() {
    return enemyFacade.findAll();
  }

  @GetMapping("/api/enemies/{enemyId}")
  public EnemyDto getEnemy(Long enemyId) {
    return enemyFacade.show(enemyId);
  }

  @PutMapping("/api/enemies")
  public EnemyDto updateEnemy(@RequestBody EnemyDto itemDto) {
    return enemyFacade.save(itemDto);
  }

  @DeleteMapping("api/enemies")
  public void deleteEnemy(@RequestBody EnemyDto itemDto) {
    enemyFacade.delete(itemDto);
  }

  @PostMapping("/api/enemies")
  public EnemyDto saveEnemy(@RequestBody EnemyDto itemDto) {
    return enemyFacade.save(itemDto);
  }

  @GetMapping("/api/enemies/enemytypes")
  public Collection<EnemyType> getEnemyTypes() {
    return enemyFacade.getItemTypes();
  }
}