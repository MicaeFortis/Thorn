package com.ho.studio.springbootreacttemplate.item.domain;

import com.ho.studio.springbootreacttemplate.item.dto.ItemDto;

import static java.util.Objects.requireNonNull;

class ItemCreator {

  Item from(ItemDto itemDto) {
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
               .prefix(itemDto.getPrefix())
               .itemType(itemDto.getItemType())
               .build();
  }
}
