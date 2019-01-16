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
               .strengthGiven(itemDto.getStrengthGiven())
               .agilityRequired(itemDto.getAgilityRequired())
               .agilityGiven(itemDto.getAgilityGiven())
               .intelligenceGiven(itemDto.getIntelligenceGiven())
               .intelligenceRequired(itemDto.getIntelligenceRequired())
               .build();
  }
}
