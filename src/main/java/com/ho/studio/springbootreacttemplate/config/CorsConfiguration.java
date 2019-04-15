package com.ho.studio.springbootreacttemplate.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("PUT", "DELETE", "GET", "POST")
            .allowCredentials(false).maxAge(3600);
    registry.addMapping("/auth/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("PUT", "DELETE", "GET", "POST")
            .allowCredentials(false).maxAge(3600);
  }
}
