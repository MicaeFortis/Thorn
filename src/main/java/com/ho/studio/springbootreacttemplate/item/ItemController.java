package com.ho.studio.springbootreacttemplate.item;

import com.ho.studio.springbootreacttemplate.item.domain.ItemFacade;
import com.ho.studio.springbootreacttemplate.item.dto.ItemDto;
import com.ho.studio.springbootreacttemplate.item.dto.ItemType;
import com.ho.studio.springbootreacttemplate.prefix.dto.PrefixDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class ItemController {

  @Autowired
  private ItemFacade itemFacade;

  @GetMapping("/api/items")
  public Collection<ItemDto> getItems() {
    return itemFacade.findAll();
  }

  @GetMapping("/api/items/{itemId}")
  public ItemDto getItem(Long itemId) {
    return itemFacade.show(itemId);
  }

  @PutMapping("/api/items")
  public ItemDto updateItem(@RequestBody ItemDto itemDto) {
    return itemFacade.save(itemDto);
  }

  @DeleteMapping("api/items")
  public void deleteItem(@RequestBody ItemDto itemDto) {
    itemFacade.delete(itemDto);
  }

  @PostMapping("/api/items")
  public ItemDto saveItem(@RequestBody ItemDto itemDto) {
    return itemFacade.save(itemDto);
  }

  @GetMapping("/api/items/itemtypes")
  public Collection<ItemType> getItemTypes() {
    return itemFacade.getItemTypes();
  }
}