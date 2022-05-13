package com.kuntsevich.organizer.repository;

import com.kuntsevich.organizer.model.Preferences;
import com.kuntsevich.organizer.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PreferencesRepository extends CrudRepository<Preferences, Long> {

    Optional<Preferences> findByUser(User user);

}
