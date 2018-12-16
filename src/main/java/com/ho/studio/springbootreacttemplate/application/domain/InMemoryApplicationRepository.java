package com.ho.studio.springbootreacttemplate.application.domain;


import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by MichalPC on 11.11.2018.
 */
class InMemoryApplicationRepository implements ApplicationRepository {
  private ConcurrentHashMap<String, Application> map = new ConcurrentHashMap<>();

  @Override public Application save(Application s) {
    map.put(s.getName(), s);
    return s;
  }

  @Override public Iterable<Application> saveAll(Iterable iterable) {
    List<Application> applicationsSaved = new ArrayList();
    iterable.forEach(i -> applicationsSaved.add(this.save((Application) i)));
    return applicationsSaved;
  }

  @Override public Optional<Application> findById(String s) {
    return Optional.ofNullable(map.get(s));
  }

  @Override public boolean existsById(String s) {
    Application application = map.get(s);
    return application != null;
  }

  @Override public Collection<Application> findAll() {
    return map.values();
  }

  @Override public Iterable<Application> findAllById(Iterable<String> iterable) {
    return null;
  }

  @Override public long count() {
    return map.size();
  }

  @Override public void deleteById(String s) {
    map.remove(s);
  }

  @Override public void delete(Application application) {
    map.remove(application.getName());
  }

  @Override public void deleteAll(Iterable<? extends Application> iterable) {
    iterable.forEach(this::delete);
  }

  @Override public void deleteAll() {
    map.clear();
  }
}
