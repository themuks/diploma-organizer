package com.kuntsevich.organizer.controller;

import com.kuntsevich.organizer.dto.UserRegistrationData;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.ControllerException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.exception.UserAlreadyExistException;
import com.kuntsevich.organizer.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    public static final String ENTITY_CODE = "2";
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        try {
            return ResponseEntity.ok(userService.findAll());
        } catch (ServiceException e) {
            throw new ControllerException("Error while signing up a new user", ENTITY_CODE);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<?> signUp(@RequestBody UserRegistrationData userRegistrationData) {
        log.debug("User registration data: {}", userRegistrationData);

        try {
            userService.signUp(userRegistrationData);
        } catch (ServiceException e) {
            throw new ControllerException("Error while signing up a new user", ENTITY_CODE);
        } catch (UserAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        return ResponseEntity.ok().build();
    }

}
