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
  public EnemyDto getEnemy(@PathVariable Long enemyId) {
    return enemyFacade.show(enemyId);
  }

  @PutMapping("/api/enemies")
  public EnemyDto updateEnemy(@RequestBody EnemyDto enemyDto) {
    return enemyFacade.save(enemyDto);
  }

  @DeleteMapping("/api/enemies")
  public @ResponseBody void deleteEnemy(@RequestBody EnemyDto enemyDto) {
    enemyFacade.delete(enemyDto);
  }

  @PostMapping("/api/enemies")
  public EnemyDto saveEnemy(@RequestBody EnemyDto enemyDto) {
    return enemyFacade.save(enemyDto);
  }

  @GetMapping("/api/enemies/enemytypes")
  public Collection<EnemyType> getEnemyTypes() {
    return enemyFacade.getItemTypes();
  }
}