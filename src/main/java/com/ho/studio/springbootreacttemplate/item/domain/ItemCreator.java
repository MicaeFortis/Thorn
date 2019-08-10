package com.ho.studio.springbootreacttemplate.item.domain;

import com.ho.studio.springbootreacttemplate.item.dto.ItemDto;
import com.ho.studio.springbootreacttemplate.prefix.domain.PrefixCreator;

import static java.util.Objects.requireNonNull;

public class ItemCreator {

  public static Item from(ItemDto itemDto) {
    requireNonNull(itemDto);
    return Item.builder()
               .id(itemDto.getId())
               .name(itemDto.getName())
               .strengthRequired(itemDto.getStrengthRequired())
               .damage(itemDto.getDamage())
               .defense(itemDto.getDefense())
               .agilityRequired(itemDto.getAgilityRequired())
               .evasion(itemDto.getEvasion())
               .wisdom(itemDto.getWisdom())
               .intelligenceRequired(itemDto.getIntelligenceRequired())
               .prefix(PrefixCreator.from(itemDto.getPrefix()))
               .itemType(itemDto.getItemType())
               .build();
  }
}
