/*package com.ho.studio.springbootreacttemplate.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // @formatter:off
    http.csrf().disable().authorizeRequests().antMatchers("/api/hello").permitAll().anyRequest().authenticated().and().exceptionHandling()
        .accessDeniedPage("/pages/base/access.xhtml").and().sessionManagement().maximumSessions(1).expiredUrl("/index.jsp")
        .maxSessionsPreventsLogin(false).and().and().formLogin().loginPage("/login").permitAll().loginProcessingUrl("/perform_login")
        .failureUrl("/login").permitAll().and().logout().invalidateHttpSession(true).logoutSuccessUrl("/index.jsp")
        .logoutUrl("/j_spring_security_logout").deleteCookies("JSESSIONID").permitAll();
    // @formatter:on
  }
}*/
