package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.controller.entity.Task;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.repository.TaskRepository;
import com.kuntsevich.organizer.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public Task save(Task task) throws ServiceException {
        return taskRepository.save(task);
    }

    public List<Task> findAll(Pageable pageable) throws ServiceException {
        return taskRepository.findAll(pageable).getContent();
    }

    @Override
    public Task findById(Long aLong) throws ServiceException {
        return null;
    }

    @Override
    public Task update(Task entity) throws ServiceException {
        return null;
    }

    public Task delete(Long id) throws ServiceException {
        Task task = taskRepository.findById(id)
                                  .orElseThrow(() -> new ServiceException("Task with id = (" + id + ") not found"));
        taskRepository.deleteById(id);
        return task;
    }

}
