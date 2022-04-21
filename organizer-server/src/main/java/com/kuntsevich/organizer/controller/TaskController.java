package com.kuntsevich.organizer.controller;

import com.kuntsevich.organizer.controller.entity.Task;
import com.kuntsevich.organizer.exception.ControllerException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private static final String ENTITY_CODE = "1";
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> create(Task task) {
        try {
            Task savedTask = taskService.save(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
        } catch (ServiceException e) {
            throw new ControllerException("Error while creating task", ENTITY_CODE);
        }
    }

    @GetMapping
    public ResponseEntity<List<Task>> findAll(Pageable pageable) {
        try {
            return ResponseEntity.ok(taskService.findAll(pageable));
        } catch (ServiceException e) {
            throw new ControllerException(e.getLocalizedMessage(), ENTITY_CODE);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Task> findById(@PathVariable Long id) {
        try {
            Task task = taskService.findById(id);
            return ResponseEntity.ok(task);
        } catch (ServiceException e) {
            throw new ControllerException(e.getLocalizedMessage(), ENTITY_CODE);
        }
    }

    @PatchMapping("{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @RequestBody Task task) {
        task.setId(id);
        try {
            Task updatedTask = taskService.update(task);
            return ResponseEntity.ok(updatedTask);
        } catch (ServiceException e) {
            throw new ControllerException(e.getLocalizedMessage(), ENTITY_CODE);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Task> delete(@PathVariable Long id) {
        try {
            Task deletedTask = taskService.delete(id);
            return ResponseEntity.ok(deletedTask);
        } catch (ServiceException e) {
            throw new ControllerException("Error while deleting task", ENTITY_CODE);
        }
    }

}
