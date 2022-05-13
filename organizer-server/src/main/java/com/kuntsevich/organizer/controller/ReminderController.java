package com.kuntsevich.organizer.controller;

import com.kuntsevich.organizer.dto.ReminderDto;
import com.kuntsevich.organizer.exception.ApiResponse;
import com.kuntsevich.organizer.exception.ControllerException;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.Reminder;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.service.ReminderService;
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
@RequestMapping("/api/reminders")
public class ReminderController {

    private static final String ENTITY_CODE = "4";
    private final ReminderService reminderService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ReminderDto> create(Authentication authentication, @RequestBody ReminderDto reminder) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        Reminder mappedReminder = ObjectMapperUtils.map(reminder, Reminder.class);

        try {
            Reminder savedReminder = reminderService.create(user, mappedReminder);
            ReminderDto mappedSavedReminder = ObjectMapperUtils.map(savedReminder, ReminderDto.class);
            return ResponseEntity.status(HttpStatus.CREATED).body(mappedSavedReminder);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

    @GetMapping
    public ResponseEntity<List<ReminderDto>> findAll(Authentication authentication, Pageable pageable) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            List<Reminder> userReminders = reminderService.findUserReminders(user, pageable);
            List<ReminderDto> reminders = ObjectMapperUtils.mapAll(userReminders, ReminderDto.class);
            return ResponseEntity.ok(reminders);
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
            Reminder reminder = reminderService.findUserReminder(user, id);
            ReminderDto mappedReminder = ObjectMapperUtils.map(reminder, ReminderDto.class);
            return ResponseEntity.ok(mappedReminder);
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
                                         @RequestBody ReminderDto reminder) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        Reminder mappedReminder = ObjectMapperUtils.map(reminder, Reminder.class);

        try {
            Reminder updatedReminder = reminderService.update(user, id, mappedReminder);
            ReminderDto mappedUpdatedReminder = ObjectMapperUtils.map(updatedReminder, ReminderDto.class);
            return ResponseEntity.ok(mappedUpdatedReminder);
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
                                                @RequestBody ReminderDto reminder) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        Reminder mappedReminder = ObjectMapperUtils.map(reminder, Reminder.class);

        try {
            Reminder updatedReminder = reminderService.partialUpdate(user, id, mappedReminder);
            ReminderDto mappedUpdatedReminder = ObjectMapperUtils.map(updatedReminder, ReminderDto.class);
            return ResponseEntity.ok(mappedUpdatedReminder);
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
            Reminder deletedReminder = reminderService.delete(user, id);
            ReminderDto mappedDeletedReminder = ObjectMapperUtils.map(deletedReminder, ReminderDto.class);
            return ResponseEntity.ok(mappedDeletedReminder);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        } catch (OperationForbiddenException e) {
            ApiResponse apiResponse =
                    new ApiResponse(e.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN + ENTITY_CODE);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
        }
    }

}
