package com.kuntsevich.organizer.controller;

import com.kuntsevich.organizer.exception.ControllerException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.service.StatisticService;
import com.kuntsevich.organizer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/statistics")
public class StatisticController {

    private static final String ENTITY_CODE = "6";
    private final StatisticService statisticService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<Map<LocalDateTime, Long>> findAll(Authentication authentication) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            Map<LocalDateTime, Long> localDateTimeLongMap = statisticService.someMethod(user);
            return ResponseEntity.ok(localDateTimeLongMap);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

}