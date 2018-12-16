package com.ho.studio.springbootreacttemplate.application;

import com.ho.studio.springbootreacttemplate.application.domain.ApplicationConfiguration;
import com.ho.studio.springbootreacttemplate.application.domain.ApplicationFacade;
import com.ho.studio.springbootreacttemplate.application.dto.ApplicationDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;

import static org.hamcrest.Matchers.equalToIgnoringCase;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by MichalPC on 12.11.2018.
 */
@RunWith(SpringRunner.class)
@WebMvcTest
public class ApplicationControllerTest {

  ApplicationDto intellij = createApplicationDto("Intellij", "Intellij", new BigDecimal(250));
  ApplicationDto winrar = createApplicationDto("Winrar", "Winrar Team", new BigDecimal(10));

  @MockBean
  private ApplicationFacade applicationFacade;

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void shouldReturnAllApplications() throws Exception {

    when(applicationFacade.findAll()).thenReturn(new ArrayList<>(Arrays.asList(intellij, winrar)));

    mockMvc.perform(get("/api/applications")).andDo(print()).andExpect(status().isOk())
           .andExpect(content().json("[{\"id\":null,\"name\":\"Intellij\",\"creatorName\":\"Intellij\",\"price\":250},{\"id\":null,\"name\":\"Winrar\",\"creatorName\":\"Winrar Team\",\"price\":10}]"));
  }

  private ApplicationDto createApplicationDto(String name, String creatorName, BigDecimal price) {
    return ApplicationDto.builder().name(name)
                         .creatorName(creatorName)
                         .price(price)
                         .build();
  }
}
