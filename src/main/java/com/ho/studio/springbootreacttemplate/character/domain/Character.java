package com.ho.studio.springbootreacttemplate.character.domain;

import com.ho.studio.springbootreacttemplate.common.Being;
import lombok.*;
import org.springframework.boot.autoconfigure.security.SecurityProperties;

import javax.persistence.Entity;
import java.io.Serializable;

@Builder
@Getter
@Setter
@AllArgsConstructor
@Entity
public class Character extends Being implements Serializable {

}
