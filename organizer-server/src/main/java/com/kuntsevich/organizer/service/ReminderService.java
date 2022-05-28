package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.Reminder;
import com.kuntsevich.organizer.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReminderService {

    Reminder delete(User user, Long id) throws ServiceException, OperationForbiddenException;

    Reminder create(User user, Reminder reminder) throws ServiceException;

    List<Reminder> findUserReminders(User user, Pageable pageable) throws ServiceException;

    Reminder findUserReminder(User user, Long id) throws ServiceException, OperationForbiddenException;

    Reminder update(User user, Long id, Reminder reminder) throws ServiceException, OperationForbiddenException;

    Reminder partialUpdate(User user, Long id, Reminder reminder) throws ServiceException, OperationForbiddenException;

}
