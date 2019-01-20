package com.ho.studio.springbootreacttemplate.enemy.domain;

import com.ho.studio.springbootreacttemplate.common.Being;
import com.ho.studio.springbootreacttemplate.item.dto.ItemDto;
import com.ho.studio.springbootreacttemplate.item.dto.ItemType;
import com.ho.studio.springbootreacttemplate.prefix.domain.Prefix;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.util.Collection;

import static java.util.Arrays.asList;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Enemy extends Being implements Serializable {

}
