package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.entity.Task;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TaskService {

    Task delete(User user, Long id) throws ServiceException, OperationForbiddenException;

    Task create(Task task) throws ServiceException;

    List<Task> findUserTasks(User user, Pageable pageable) throws ServiceException;

    Task updateUserTask(User user, Task task) throws ServiceException, OperationForbiddenException;

}
