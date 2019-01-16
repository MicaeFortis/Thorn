package com.ho.studio.springbootreacttemplate.item.domain;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ItemConfiguration {

  @Bean
  ItemFacade itemFacade(ItemRepository itemRepository) {
    ItemCreator itemCreator = new ItemCreator();
    return new ItemFacade(itemRepository, itemCreator);
  }
}
