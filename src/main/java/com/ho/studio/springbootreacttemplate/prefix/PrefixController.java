package com.ho.studio.springbootreacttemplate.prefix;

import com.ho.studio.springbootreacttemplate.prefix.domain.PrefixFacade;
import com.ho.studio.springbootreacttemplate.prefix.dto.PowerUp;
import com.ho.studio.springbootreacttemplate.prefix.dto.PrefixDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class PrefixController {

  @Autowired
  private PrefixFacade prefixFacade;

  @GetMapping("/api/prefixes")
  public Collection<PrefixDto> getPrefixes() {
    return prefixFacade.findAll();
  }

  @GetMapping("/api/prefixes/{prefixId}")
  public PrefixDto getPrefix(Long prefixId) {
    return prefixFacade.show(prefixId);
  }

  @PutMapping("/api/prefixes")
  public PrefixDto updatePrefix(@RequestBody PrefixDto prefixDto) {
    return prefixFacade.save(prefixDto);
  }

  @DeleteMapping("api/prefixes")
  public void deletePrefix(@RequestBody PrefixDto prefixDto) {
    prefixFacade.delete(prefixDto);
  }

  @PostMapping("/api/prefixes")
  public PrefixDto savePrefix(@RequestBody PrefixDto prefix) {
    return prefixFacade.save(prefix);
  }

  @GetMapping("/api/prefixes/powerups")
  public Collection<PowerUp> getPowerUps() {
    return prefixFacade.getPowerUps();
  }
}
