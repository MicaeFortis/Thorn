package com.ho.studio.springbootreacttemplate.user.domain;

import com.ho.studio.springbootreacttemplate.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Transactional
public class UserFacade implements UserDetailsService {

  private final UserRepository userRepository;
  private final UserCreator userCreator = new UserCreator();

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findUserByUsername(username);

    if(user == null) {
      throw new UsernameNotFoundException(String.format("The username %s doesn't exist", username));
    }

    return user;
  }

  public UserDto save(UserDto userDto) {
    User user = userCreator.from(userDto);
    return userRepository.save(user).dto();
  }
}
