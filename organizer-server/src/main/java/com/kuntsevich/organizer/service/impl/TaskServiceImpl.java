package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.entity.Task;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.repository.TaskRepository;
import com.kuntsevich.organizer.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public Task create(Task task) {
        return taskRepository.save(task);
    }

    public Task delete(User user, Long id) throws ServiceException, OperationForbiddenException {
        Task task = taskRepository.findById(id)
                                  .orElseThrow(() -> new ServiceException("Task with id = (" + id + ") not found"));

        if (!Objects.equals(task.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the delete operation");
        }

        taskRepository.deleteById(id);
        return task;
    }

    @Override
    public List<Task> findUserTasks(User user, Pageable pageable) {
        return taskRepository.findByUser(user, pageable).getContent();
    }

    @Override
    public Task updateUserTask(User user, Task newTask) throws ServiceException, OperationForbiddenException {
        Task oldTask = taskRepository.findById(newTask.getId())
                                     .orElseThrow(() -> new ServiceException(
                                             "Task with id = (" + newTask.getId() + ") not found"));

        if (!Objects.equals(oldTask.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the update operation");
        }

        return taskRepository.save(newTask);
    }

}
