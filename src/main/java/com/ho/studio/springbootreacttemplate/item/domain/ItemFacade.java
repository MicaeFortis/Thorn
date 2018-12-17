package com.ho.studio.springbootreacttemplate.item.domain;

import com.ho.studio.springbootreacttemplate.item.dto.ItemDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

/**
 * Created by MichalPC on 11.11.2018.
 */
@Transactional
public class ItemFacade {
  private ItemRepository itemRepository;
  private ItemCreator itemCreator;

  ItemFacade(ItemRepository itemRepository,
             ItemCreator itemCreator) {
    this.itemRepository = itemRepository;
    this.itemCreator = itemCreator;
  }

  public ItemDto add(ItemDto itemDto) {
    Item item = itemCreator.from(itemDto);
    return itemRepository.save(item).dto();
  }

  public ItemDto show(Long id) {
    Optional<Item> item = itemRepository.findById(id);
    return item.map(Item::dto).orElse(null);
  }

  public void delete(ItemDto itemDto) {
    Item item = itemCreator.from(itemDto);
    itemRepository.delete(item);
  }

  public ItemDto save(ItemDto itemDto) {
    Item item = itemCreator.from(itemDto);
    return itemRepository.save(item).dto();
  }

  public Collection<ItemDto> findAll() {
    return itemRepository.findAll().stream().map(Item::dto).collect(toList());
  }
}
