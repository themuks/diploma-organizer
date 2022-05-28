package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.dto.UserRegistrationDataDto;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.exception.UserAlreadyExistException;
import com.kuntsevich.organizer.model.User;

import java.util.List;

public interface UserService {

    User findUserByEmail(String email) throws ServiceException;

    List<User> findAll() throws ServiceException;

    User update(User user) throws ServiceException;

    User signUp(UserRegistrationDataDto userRegistrationDataDto) throws ServiceException, UserAlreadyExistException;

    boolean activateAccount(Long id, String secretCode) throws ServiceException;

    List<Object> search(User user, String query) throws ServiceException;

}
