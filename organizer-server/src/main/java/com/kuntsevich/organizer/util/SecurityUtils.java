package com.kuntsevich.organizer.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kuntsevich.organizer.security.SecurityConstants;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class SecurityUtils {

    public static String createAccessToken(String requestUrl,
                                           String email,
                                           List<String> roles) {
        Algorithm algorithm = Algorithm.HMAC256(SecurityConstants.SECRET_KEY);
        return JWT.create()
                  .withSubject(email)
                  .withExpiresAt(new Date(
                          System.currentTimeMillis() + SecurityConstants.VALIDITY_IN_MILLISECONDS))
                  .withIssuer(requestUrl)
                  .withClaim("roles", roles)
                  .sign(algorithm);
    }

    public static String createRefreshToken(String requestUrl,
                                            String email) {
        Algorithm algorithm = Algorithm.HMAC256(SecurityConstants.SECRET_KEY);
        return JWT.create()
                  .withSubject(email)
                  .withExpiresAt(new Date(
                          System.currentTimeMillis() + SecurityConstants.VALIDITY_IN_MILLISECONDS))
                  .withIssuer(requestUrl)
                  .sign(algorithm);
    }

    public static void writeParametersToResponse(HttpServletResponse response, Map<String, String> tokens)
            throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }

}
