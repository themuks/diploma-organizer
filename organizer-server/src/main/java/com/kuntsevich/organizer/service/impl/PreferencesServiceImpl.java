package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.exception.EntityNotFoundException;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.Preferences;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.repository.PreferencesRepository;
import com.kuntsevich.organizer.service.PreferencesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PreferencesServiceImpl implements PreferencesService {

    private final PreferencesRepository preferencesRepository;

    @Override
    public Preferences findUserPreferences(User user) throws ServiceException, OperationForbiddenException {
        Preferences preferences = preferencesRepository.findByUser(user)
                                                       .orElseThrow(() -> new EntityNotFoundException(
                                                               "Preferences of user with id = (" + user.getId()
                                                                       + ") not found"));

        if (!Objects.equals(preferences.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the update operation");
        }

        return preferences;
    }

    @Override
    public Preferences update(User user, Preferences newPreferences)
            throws ServiceException, OperationForbiddenException {
        Preferences preferences = preferencesRepository.findByUser(user)
                                                       .orElseThrow(() -> new EntityNotFoundException(
                                                               "Preferences of user with id = (" + user.getId()
                                                                       + ") not found"));

        if (!Objects.equals(preferences.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the update operation");
        }

        newPreferences.setId(preferences.getId());
        newPreferences.setUser(user);

        return preferencesRepository.save(newPreferences);
    }

}
