package com.ho.studio.springbootreacttemplate.common;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@MappedSuperclass
public abstract class Being implements Serializable {

  @Id
  @GeneratedValue
  private Long id;
  private String name;
  private double strength;
  private double agility;
  private double intelligence;

  private double hitPoints;
  private boolean dead;

  public void getHit(double damage) {
    hitPoints -= damage;
  }

  private boolean gotAnyHitPointLeft() {
    return hitPoints > 0;
  }

  private void becomeDead() {
    dead = true;
  }

  public void deathHitIfNoMoreHitPoints() {
    if (!gotAnyHitPointLeft()) {
      becomeDead();
    }
  }
}
