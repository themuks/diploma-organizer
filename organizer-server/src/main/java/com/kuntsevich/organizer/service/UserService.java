package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.dto.UserRegistrationData;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.exception.UserAlreadyExistException;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll() throws ServiceException;

    Optional<User> findByEmail(String email) throws ServiceException;

    User signUp(UserRegistrationData userRegistrationData) throws ServiceException, UserAlreadyExistException;

}
