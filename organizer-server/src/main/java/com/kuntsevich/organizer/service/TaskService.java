package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.Task;
import com.kuntsevich.organizer.model.User;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TaskService {

    Task delete(User user, Long id) throws ServiceException, OperationForbiddenException;

    Task create(User user, Task task) throws ServiceException;

    List<Task> findUserTasks(User user, Pageable pageable) throws ServiceException;

    Task findUserTask(User user, Long id) throws ServiceException, OperationForbiddenException;

    Task update(User user, Long id, Task task) throws ServiceException, OperationForbiddenException;

    Task partialUpdate(User user, Long id, Task task) throws ServiceException, OperationForbiddenException;

    List<Task> planTasks(User user) throws ServiceException;

}
