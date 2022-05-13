package com.kuntsevich.organizer.controller;

import com.kuntsevich.organizer.service.UserService;
import com.kuntsevich.organizer.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthenticationController {

    private static final String BEARER = "Bearer ";
    private static final String ENTITY_CODE = "0";
    private final UserService userService;
    private final SecurityUtils securityUtils;

//    @GetMapping("/token/refresh")
//    public ResponseEntity<ApiResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) {
//        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//
//        if (authorizationHeader == null || !authorizationHeader.startsWith(BEARER)) {
//            ApiResponse refreshTokenIsMissing =
//                    new ApiResponse("Refresh token is missing", HttpServletResponse.SC_BAD_REQUEST + ENTITY_CODE);
//            return ResponseEntity.badRequest().body(refreshTokenIsMissing);
//        }
//
//        try {
//            String refreshToken = authorizationHeader.substring(BEARER.length());
//            Algorithm algorithm = Algorithm.HMAC256(secretKey);
//            JWTVerifier verifier = JWT.require(algorithm).build();
//            DecodedJWT decodedJwt = verifier.verify(refreshToken);
//            String email = decodedJwt.getSubject();
//
//            User user;
//
//            try {
//                user = userService.findUserByEmail(email);
//            } catch (ServiceException e) {
//                throw new ControllerException(e, ENTITY_CODE);
//            }
//
//            String requestUrl = request.getRequestURL().toString();
//            List<String> roles = List.of(user.getRole().getName());
//
//            String accessToken = securityUtils.createAccessToken(requestUrl, email, roles);
//
//            Map<String, String> tokens = new HashMap<>();
//            tokens.put("accessToken", accessToken);
//            SecurityUtils.writeParametersToResponse(response, tokens);
//        } catch (Exception e) {
//            log.error("Error logging in", e);
//
//            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//
//            try {
//                Map<String, String> error = new HashMap<>();
//                error.put("errorMessage", e.getLocalizedMessage());
//                SecurityUtils.writeParametersToResponse(response, error);
//            } catch (IOException ex) {
//                throw new ControllerException("Error while writing a response", ex, ENTITY_CODE);
//            }
//
//        }
//
//        return ResponseEntity.ok().build();
//    }

}
