package com.ho.studio.springbootreacttemplate.prefix;

import com.ho.studio.springbootreacttemplate.item.dto.ItemDto;
import com.ho.studio.springbootreacttemplate.prefix.domain.PrefixFacade;
import com.ho.studio.springbootreacttemplate.prefix.dto.PrefixDto;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * Created by MichalPC on 12.11.2018.
 */
@RestController
public class PrefixController {
  private PrefixFacade prefixFacade;

  public PrefixController(PrefixFacade prefixFacade) {
    this.prefixFacade = prefixFacade;
  }

  @GetMapping("/api/prefixes")
  public Collection<PrefixDto> getPrefixes() {
    return prefixFacade.findAll();
  }

  @GetMapping("/api/prefixes/{prefixId}")
  public PrefixDto getPrefix(Long prefixId) {
    return prefixFacade.show(prefixId);
  }

  @PutMapping("/api/prefixes/{prefixId}")
  public PrefixDto updatePrefix(PrefixDto prefixDto) {
    return prefixFacade.save(prefixDto);
  }

  @DeleteMapping("api/prefixes/{prefixId}")
  public void deletePrefix(PrefixDto prefixDto) {
    prefixFacade.delete(prefixDto);
  }

  @PostMapping("/api/prefixes")
  public PrefixDto addPrefix(PrefixDto prefixDto) {
    return prefixFacade.save(prefixDto);
  }


}
