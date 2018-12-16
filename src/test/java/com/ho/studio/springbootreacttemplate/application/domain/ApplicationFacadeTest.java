package com.ho.studio.springbootreacttemplate.application.domain;

import com.ho.studio.springbootreacttemplate.application.dto.ApplicationDto;
import com.ho.studio.springbootreacttemplate.application.dto.ApplicationNotFoundException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

/**
 * Created by MichalPC on 12.11.2018.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationFacadeTest {
  ApplicationFacade facade = new ApplicationConfiguration().applicationFacade();

  ApplicationDto intellij = createApplicationDto("Intellij", "Intellij", new BigDecimal(250));
  ApplicationDto winrar = createApplicationDto("Winrar", "Winrar Team", new BigDecimal(10));

  @Test
  public void givenApplicationIfPresentShow() {
    facade.add(intellij);
    Assert.assertEquals(facade.show(intellij.getName()), intellij);
  }

  @Test(expected = ApplicationNotFoundException.class)
  public void givenAppIfNotPresentThrow() {
    facade.show("Not present application");
  }

  @Test
  public void givenAppReturnListOfApps() {
    facade.add(intellij);
    facade.add(winrar);

    Collection<ApplicationDto> applicationDtos = new ArrayList<>(Arrays.asList(intellij, winrar));

    Assert.assertEquals(facade.findAll(), applicationDtos);
  }

  private ApplicationDto createApplicationDto(String name, String creatorName, BigDecimal price) {
    return ApplicationDto.builder().name(name)
        .creatorName(creatorName)
        .price(price)
        .build();
  }


}
