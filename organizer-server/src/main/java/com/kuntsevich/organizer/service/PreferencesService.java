package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.Preferences;
import com.kuntsevich.organizer.model.User;

public interface PreferencesService {

    Preferences findUserPreferences(User user) throws ServiceException, OperationForbiddenException;

    Preferences update(User user, Preferences preferences) throws ServiceException, OperationForbiddenException;

}
