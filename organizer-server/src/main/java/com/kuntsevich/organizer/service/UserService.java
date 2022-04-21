package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.dto.UserRegistrationData;
import com.kuntsevich.organizer.controller.entity.User;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.exception.UserAlreadyExistException;

import java.util.List;

public interface UserService {

    List<User> findAll() throws ServiceException;

    User signUp(UserRegistrationData userRegistrationData) throws ServiceException, UserAlreadyExistException;

}
