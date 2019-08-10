package com.ho.studio.springbootreacttemplate.config.authorization;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ho.studio.springbootreacttemplate.user.domain.User;
import com.ho.studio.springbootreacttemplate.user.domain.UserFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.ho.studio.springbootreacttemplate.config.authorization.SecurityConstants.*;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

  private UserFacade userFacade;

  public JWTAuthorizationFilter(AuthenticationManager authManager, UserFacade userFacade) {
    super(authManager);
    this.userFacade = userFacade;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req,
                                  HttpServletResponse res,
                                  FilterChain chain) throws IOException, ServletException {
    String header = req.getHeader(HEADER_STRING);

    if (header == null || !header.startsWith(TOKEN_PREFIX)) {
      chain.doFilter(req, res);
      return;
    }

    UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

    SecurityContextHolder.getContext().setAuthentication(authentication);
    chain.doFilter(req, res);
  }

  private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
    String token = request.getHeader(HEADER_STRING);
    if (token != null) {
      // parse the token.
      String user = JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
                       .build()
                       .verify(token.replace(TOKEN_PREFIX, ""))
                       .getSubject();

      if (user != null) {
        List<SimpleGrantedAuthority> authorities = getAuthorities(user);
        return new UsernamePasswordAuthenticationToken(user, null, authorities);
      }
      return null;
    }
    return null;
  }

  private List<SimpleGrantedAuthority> getAuthorities(String username) {
    return userFacade.loadUserByUsername(username).getAuthorities();
  }
}