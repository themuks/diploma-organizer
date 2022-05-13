package com.kuntsevich.organizer.controller;

import com.kuntsevich.organizer.dto.RecommendationDto;
import com.kuntsevich.organizer.exception.ControllerException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.service.RecommendationService;
import com.kuntsevich.organizer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private static final String ENTITY_CODE = "5";
    private final RecommendationService recommendationService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<RecommendationDto>> findAll(Authentication authentication) {
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


}
