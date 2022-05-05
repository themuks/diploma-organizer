package com.kuntsevich.organizer.controller;

import com.kuntsevich.organizer.dto.TaskDto;
import com.kuntsevich.organizer.entity.Task;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.ApiResponse;
import com.kuntsevich.organizer.exception.ControllerException;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.service.TaskService;
import com.kuntsevich.organizer.service.UserService;
import com.kuntsevich.organizer.util.ObjectMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private static final String ENTITY_CODE = "1";
    private final TaskService taskService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<TaskDto> create(Authentication authentication, @RequestBody TaskDto task) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        Task mappedTask = ObjectMapperUtils.map(task, Task.class);

        try {
            Task savedTask = taskService.create(user, mappedTask);
            TaskDto mappedSavedTask = ObjectMapperUtils.map(savedTask, TaskDto.class);
            return ResponseEntity.status(HttpStatus.CREATED).body(mappedSavedTask);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> findAll(Authentication authentication, Pageable pageable) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            List<Task> userTasks = taskService.findUserTasks(user, pageable);
            List<TaskDto> tasks = ObjectMapperUtils.mapAll(userTasks, TaskDto.class);
            return ResponseEntity.ok(tasks);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Object> findById(Authentication authentication, @PathVariable Long id) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            Task task = taskService.findUserTask(user, id);
            TaskDto mappedTask = ObjectMapperUtils.map(task, TaskDto.class);
            return ResponseEntity.ok(mappedTask);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        } catch (OperationForbiddenException e) {
            ApiResponse apiResponse =
                    new ApiResponse(e.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN + ENTITY_CODE);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> update(Authentication authentication,
                                         @PathVariable Long id,
                                         @RequestBody TaskDto task) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        Task mappedTask = ObjectMapperUtils.map(task, Task.class);

        try {
            Task updatedTask = taskService.update(user, id, mappedTask);
            TaskDto mappedUpdatedTask = ObjectMapperUtils.map(updatedTask, TaskDto.class);
            return ResponseEntity.ok(mappedUpdatedTask);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        } catch (OperationForbiddenException e) {
            ApiResponse apiResponse =
                    new ApiResponse(e.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN + ENTITY_CODE);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
        }
    }

    @PatchMapping("{id}")
    public ResponseEntity<Object> partialUpdate(Authentication authentication,
                                                @PathVariable Long id,
                                                @RequestBody TaskDto task) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        Task mappedTask = ObjectMapperUtils.map(task, Task.class);

        try {
            Task updatedTask = taskService.partialUpdate(user, id, mappedTask);
            TaskDto mappedUpdatedTask = ObjectMapperUtils.map(updatedTask, TaskDto.class);
            return ResponseEntity.ok(mappedUpdatedTask);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        } catch (OperationForbiddenException e) {
            ApiResponse apiResponse =
                    new ApiResponse(e.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN + ENTITY_CODE);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(Authentication authentication, @PathVariable Long id) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            Task deletedTask = taskService.delete(user, id);
            TaskDto mappedDeletedTask = ObjectMapperUtils.map(deletedTask, TaskDto.class);
            return ResponseEntity.ok(mappedDeletedTask);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        } catch (OperationForbiddenException e) {
            ApiResponse apiResponse =
                    new ApiResponse(e.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN + ENTITY_CODE);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
        }
    }

}
