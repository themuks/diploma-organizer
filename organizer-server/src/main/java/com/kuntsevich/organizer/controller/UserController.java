package com.kuntsevich.organizer.controller;

import com.kuntsevich.organizer.dto.RecommendationDto;
import com.kuntsevich.organizer.dto.UserDto;
import com.kuntsevich.organizer.dto.UserRegistrationDataDto;
import com.kuntsevich.organizer.dto.UserStatisticsDto;
import com.kuntsevich.organizer.exception.*;
import com.kuntsevich.organizer.model.Preferences;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.service.PreferencesService;
import com.kuntsevich.organizer.service.RecommendationService;
import com.kuntsevich.organizer.service.StatisticsService;
import com.kuntsevich.organizer.service.UserService;
import com.kuntsevich.organizer.util.ObjectMapperUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    public static final String ENTITY_CODE = "2";
    private final UserService userService;
    private final PreferencesService preferencesService;
    private final RecommendationService recommendationService;
    private final StatisticsService statisticsService;

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

    @GetMapping("/me/preferences")
    public ResponseEntity<Object> findUserPreferences(Authentication authentication) {
        String email = authentication.getName();
        User user;
        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        Preferences preferences;
        try {
            preferences = preferencesService.findUserPreferences(user);
//            PreferencesDto mappedPreferences = ObjectMapperUtils.map(preferences, PreferencesDto.class);
            return ResponseEntity.ok(preferences);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        } catch (OperationForbiddenException e) {
            ApiResponse apiResponse =
                    new ApiResponse(e.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN + ENTITY_CODE);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
        }
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
    public ResponseEntity<?> activateAccount(@PathVariable Long id, @RequestParam String secretCode) {
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

    @PutMapping("/me")
    public ResponseEntity<Object> update(Authentication authentication, @RequestBody UserDto userData) {
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

    @PutMapping("/me/preferences")
    public ResponseEntity<Object> updateUserPreferences(Authentication authentication,
                                                        @RequestBody Preferences preferences) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            preferences = preferencesService.update(user, preferences);
            return ResponseEntity.ok(preferences);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        } catch (OperationForbiddenException e) {
            ApiResponse apiResponse =
                    new ApiResponse(e.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN + ENTITY_CODE);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
        }
    }

    @GetMapping("/me/recommendations")
    public ResponseEntity<List<RecommendationDto>> findUserRecommendations(Authentication authentication) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            List<RecommendationDto> recommendationDtos = recommendationService.formRecommendations(user);
            return ResponseEntity.ok(recommendationDtos);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

    @GetMapping("/me/statistics")
    public ResponseEntity<UserStatisticsDto> findUserStatistics(Authentication authentication) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            UserStatisticsDto userStatisticsDto = statisticsService.formUserStatistics(user);
            return ResponseEntity.ok(userStatisticsDto);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

    @GetMapping("/me/entities")
    public ResponseEntity<List<Object>> searchEntities(Authentication authentication, @RequestParam String filter) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            List<Object> objectList = userService.search(user, filter);
            return ResponseEntity.ok(objectList);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

}
