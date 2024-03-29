package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.exception.EntityNotFoundException;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.model.Preferences;
import com.kuntsevich.organizer.model.Task;
import com.kuntsevich.organizer.model.TaskChange;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.model.enumerated.Goal;
import com.kuntsevich.organizer.model.enumerated.TaskField;
import com.kuntsevich.organizer.model.enumerated.TaskStatus;
import com.kuntsevich.organizer.repository.PreferencesRepository;
import com.kuntsevich.organizer.repository.TaskChangeRepository;
import com.kuntsevich.organizer.repository.TaskRepository;
import com.kuntsevich.organizer.service.ScheduleService;
import com.kuntsevich.organizer.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private final ScheduleService scheduleService;
    private final TaskRepository taskRepository;
    private final TaskChangeRepository taskChangeRepository;
    private final PreferencesRepository preferencesRepository;
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

        if (Optional.ofNullable(newTask.getStartTime()).isPresent()) {
            newTask.setEndTime(newTask.getStartTime()
                                      .plusHours(Optional.ofNullable(newTask.getTaskComplexityInHours()).orElse(0L)));
        }

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

        if (!task.equals(newTask)) {
            TaskChange taskChange = new TaskChange();
            if (!task.getTitle().equals(newTask.getTitle())) {
                taskChange.setTaskField(TaskField.TITLE);
                taskChange.setNewValue(newTask.getTitle());
                taskChangeRepository.save(taskChange);
            }
            if (!task.getDescription().equals(newTask.getDescription())) {
                taskChange.setTaskField(TaskField.DESCRIPTION);
                taskChange.setNewValue(newTask.getDescription());
                taskChangeRepository.save(taskChange);
            }
            if (!task.getTaskStatus().equals(newTask.getTaskStatus())) {
                taskChange.setTaskField(TaskField.STATUS);
                taskChange.setNewValue(newTask.getTaskStatus().toString());
                taskChangeRepository.save(taskChange);
            }
            if (!task.getStartTime().equals(newTask.getStartTime())) {
                taskChange.setTaskField(TaskField.START_TIME);
                taskChange.setNewValue(newTask.getStartTime().toString());
                taskChangeRepository.save(taskChange);
            }
            if (!task.getTaskComplexityInHours().equals(newTask.getTaskComplexityInHours())) {
                taskChange.setTaskField(TaskField.COMPLEXITY);
                taskChange.setNewValue(newTask.getTaskComplexityInHours().toString());
                taskChangeRepository.save(taskChange);
            }
            if (!task.getPriority().equals(newTask.getPriority())) {
                taskChange.setTaskField(TaskField.PRIORITY);
                taskChange.setNewValue(newTask.getPriority().toString());
                taskChangeRepository.save(taskChange);
            }
            if (!task.getDueTime().equals(newTask.getDueTime())) {
                taskChange.setTaskField(TaskField.DUE_TIME);
                taskChange.setNewValue(newTask.getDueTime().toString());
                taskChangeRepository.save(taskChange);
            }
        }

        modelMapper.map(newTask, task);

        task.setEndTime(task.getStartTime().plusHours(task.getTaskComplexityInHours()));

        return taskRepository.save(task);
    }

    @Override
    public List<Task> planTasks(User user) {
        Preferences preferences = preferencesRepository.findByUser(user)
                                                       .orElseThrow(() -> new EntityNotFoundException(
                                                               "Preferences of user with id = (" + user.getId()
                                                                       + ") not found"));

        LocalTime workStartTime = preferences.getWorkStartTime();
        LocalTime workEndTime = preferences.getWorkEndTime();
        Goal goal = preferences.getGoal();
        long gapInMinutes = preferences.getGapBetweenTasksInMinutes();

        List<Task> placedTasks = new ArrayList<>();

        Iterable<Task> tasks;
        if (goal == Goal.DO_MORE_TASKS) {
            tasks = taskRepository.findByUserAndTaskStatusOrderByTaskComplexityInHoursAscCreatedAtDesc(user,
                                                                                                       TaskStatus.TO_DO);
        } else {
            tasks = taskRepository.findByUserAndTaskStatusOrderByPriorityDescCreatedAtDesc(user, TaskStatus.TO_DO);
        }

        for (Task task : tasks) {
            task.setStartTime(null);
            task.setEndTime(null);
            taskRepository.save(task);
        }

        for (Task task : tasks) {
            scheduleService.placeTaskIntoTimeSlot(task, workStartTime, workEndTime, gapInMinutes);
            Task savedTask = taskRepository.save(task);
            placedTasks.add(savedTask);
        }

        return placedTasks;
    }

}
