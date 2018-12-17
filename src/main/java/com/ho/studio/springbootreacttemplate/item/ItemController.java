package com.ho.studio.springbootreacttemplate.item;

import com.ho.studio.springbootreacttemplate.item.domain.ItemFacade;
import com.ho.studio.springbootreacttemplate.item.dto.ItemDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

/**
 * Created by MichalPC on 12.11.2018.
 */
@RestController
public class ItemController {
  private ItemFacade itemFacade;

  public ItemController(ItemFacade itemFacade) {
    this.itemFacade = itemFacade;
  }

  @GetMapping("/api/items")
  public Collection<ItemDto> getItems() {
    return itemFacade.findAll();
  }
}