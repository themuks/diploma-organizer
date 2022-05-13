package com.kuntsevich.organizer.controller;

import com.kuntsevich.organizer.dto.UserDto;
import com.kuntsevich.organizer.dto.UserRegistrationDataDto;
import com.kuntsevich.organizer.exception.ControllerException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.exception.UserAlreadyExistException;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.service.UserService;
import com.kuntsevich.organizer.util.ObjectMapperUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.awt.print.Pageable;
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
            throw new ControllerException("Error while signing up a new user", e, ENTITY_CODE);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> findUserData(Authentication authentication) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        UserDto mappedUser = ObjectMapperUtils.map(user, UserDto.class);

        return ResponseEntity.ok(mappedUser);
    }

    @PostMapping
    public ResponseEntity<?> signUp(@RequestBody UserRegistrationDataDto userRegistrationDataDto) {
        log.info("User registration data: {}", userRegistrationDataDto);

        try {
            userService.signUp(userRegistrationDataDto);
        } catch (ServiceException e) {
            throw new ControllerException("Error while signing up a new user", e, ENTITY_CODE);
        } catch (UserAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        return ResponseEntity.ok().build();
    }

    @RequestMapping("{id}/activate")
    public ResponseEntity<?> activateAccount(@PathVariable Long id,
                                             @RequestParam String secretCode) {
        try {
            if (!userService.activateAccount(id, secretCode)) {
                return ResponseEntity.badRequest().build();
            }
        } catch (ServiceException e) {
            throw new ControllerException("Error while activating an account", e, ENTITY_CODE);
        }

        String redirectUrl = UriComponentsBuilder.newInstance()
                                                 .scheme("http")
                                                 .host("localhost")
                                                 .port(3000)
                                                 .path("login")
                                                 .encode()
                                                 .build()
                                                 .toString();

        return ResponseEntity.status(HttpStatus.FOUND).header("Location", redirectUrl).build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> update(Authentication authentication,
                                         @RequestBody UserDto userData) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        User mappedUser = ObjectMapperUtils.map(userData, user);

        try {
            User updatedUser = userService.update(mappedUser);
            UserDto mappedUpdatedUser = ObjectMapperUtils.map(updatedUser, UserDto.class);
            return ResponseEntity.ok(mappedUpdatedUser);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

    @GetMapping("/entities")
    public ResponseEntity<List<Object>> searchEntities(Authentication authentication, Pageable pageable) {
        return null;
    }

}
