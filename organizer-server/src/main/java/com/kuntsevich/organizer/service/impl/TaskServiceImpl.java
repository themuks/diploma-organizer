package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.entity.Task;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.EntityNotFoundException;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.repository.TaskRepository;
import com.kuntsevich.organizer.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
    private final ModelMapper modelMapper;

    public Task create(User user, Task task) {
        task.setUser(user);
        return taskRepository.save(task);
    }

    public Task delete(User user, Long id) throws OperationForbiddenException {
        Task task = taskRepository.findById(id)
                                  .orElseThrow(
                                          () -> new EntityNotFoundException("Task with id = (" + id + ") not found"));

        if (!Objects.equals(task.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the delete operation");
        }

        taskRepository.deleteById(id);
        return task;
    }

    @Override
    public List<Task> findUserTasks(User user, Pageable pageable) {
        return taskRepository.findByUserOrderByTaskStatusAscUpdatedAtDesc(user, pageable).getContent();
    }

    @Override
    public Task findUserTask(User user, Long id) throws OperationForbiddenException {
        Task task = taskRepository.findById(id)
                                  .orElseThrow(
                                          () -> new EntityNotFoundException("Task with id = (" + id + ") not found"));

        if (!Objects.equals(task.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the update operation");
        }

        return task;
    }

    @Override
    public Task update(User user, Long id, Task newTask) throws OperationForbiddenException {
        Task task = taskRepository.findById(id)
                                  .orElseThrow(() -> new EntityNotFoundException(
                                          "Task with id = (" + newTask.getId() + ") not found"));

        if (!Objects.equals(task.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the update operation");
        }

        newTask.setId(id);
        newTask.setUser(user);

        return taskRepository.save(newTask);
    }

    @Override
    public Task partialUpdate(User user, Long id, Task newTask) throws OperationForbiddenException {
        Task task = taskRepository.findById(id)
                                  .orElseThrow(() -> new EntityNotFoundException(
                                          "Task with id = (" + newTask.getId() + ") not found"));

        if (!Objects.equals(task.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the update operation");
        }

        modelMapper.map(newTask, task);

        return taskRepository.save(task);
    }

}
