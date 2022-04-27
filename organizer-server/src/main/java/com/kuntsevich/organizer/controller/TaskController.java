package com.kuntsevich.organizer.controller;

import com.kuntsevich.organizer.entity.Task;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.ApiResponse;
import com.kuntsevich.organizer.exception.ControllerException;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.service.TaskService;
import com.kuntsevich.organizer.service.UserService;
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
    public ResponseEntity<Task> create(Authentication authentication, Task task) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        task.setUser(user);

        try {
            Task savedTask = taskService.create(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

    @GetMapping
    public ResponseEntity<List<Task>> findAll(Authentication authentication, Pageable pageable) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            return ResponseEntity.ok(taskService.findUserTasks(user, pageable));
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

    @PatchMapping("{id}")
    public ResponseEntity<Object> update(Authentication authentication, @PathVariable Long id, @RequestBody Task task) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        task.setId(id);
        try {
            Task updatedTask = taskService.updateUserTask(user, task);
            return ResponseEntity.ok(updatedTask);
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
            return ResponseEntity.ok(deletedTask);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        } catch (OperationForbiddenException e) {
            ApiResponse apiResponse =
                    new ApiResponse(e.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN + ENTITY_CODE);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
        }
    }

}
