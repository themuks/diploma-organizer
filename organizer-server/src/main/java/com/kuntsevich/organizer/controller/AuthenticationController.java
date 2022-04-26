package com.kuntsevich.organizer.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.ControllerException;
import com.kuntsevich.organizer.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthenticationController {

    private static final String BEARER = "Bearer ";
    private static final String ENTITY_CODE = "0";
    private final UserService userService;

    @GetMapping("/token/refresh")
    public ResponseEntity<String> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER)) {

            try {
                String refreshToken = authorizationHeader.substring(BEARER.length());
                Algorithm algorithm = Algorithm.HMAC256("secret");
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String username = decodedJWT.getSubject();
                Optional<User> optionalUser = userService.findByEmail(username);

                if (optionalUser.isEmpty()) {
                    throw new ControllerException("Error while finding a user by email", ENTITY_CODE);
                } else {
                    User user = optionalUser.get();

                    String accessToken = JWT.create()
                                            .withSubject(user.getEmail())
                                            .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                                            .withIssuer(request.getRequestURL().toString())
                                            .withClaim("roles", List.of(user.getRole().getName()))
                                            .sign(algorithm);

                    Map<String, String> tokens = new HashMap<>();
                    tokens.put("accessToken", accessToken);
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(), tokens);
                }
            } catch (Exception e) {
                log.error("Error logging in: {}", e.getLocalizedMessage());
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                Map<String, String> error = new HashMap<>();
                error.put("errorMessage", e.getLocalizedMessage());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                try {
                    new ObjectMapper().writeValue(response.getOutputStream(), error);
                } catch (IOException ex) {
                    throw new ControllerException("Error while writing a response", ex, ENTITY_CODE);
                }

            }

        } else {
            return ResponseEntity.badRequest().body("Refresh token is missing");
        }

        return ResponseEntity.ok().build();
    }

}
