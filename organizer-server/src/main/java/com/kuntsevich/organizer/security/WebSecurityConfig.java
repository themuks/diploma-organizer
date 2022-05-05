package com.kuntsevich.organizer.security;

import com.kuntsevich.organizer.entity.Role;
import com.kuntsevich.organizer.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_USER = "ROLE_USER";
    public static final String ADMIN = "ADMIN";
    public static final String USER = "USER";
    private final MySqlUserDetailsService userDetailsService;
    private final RoleRepository roleRepository;
    private boolean alreadySetup = false;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter filter = new CustomAuthenticationFilter(authenticationManagerBean());
        filter.setFilterProcessesUrl("/api/login");

        http.csrf().disable();
        http.cors();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers("/api/login/**", "/api/token/refresh/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/users/**").permitAll();
        http.authorizeRequests().antMatchers("/api/**").hasRole(USER);
        http.authorizeRequests().antMatchers("/**").hasRole(ADMIN);
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(filter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration().applyPermitDefaultValues();
        config.addAllowedMethod(HttpMethod.OPTIONS);
        config.addAllowedMethod(HttpMethod.PATCH);
        config.addAllowedMethod(HttpMethod.PUT);
        config.addAllowedMethod(HttpMethod.DELETE);
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @EventListener
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (alreadySetup) {
            return;
        }

        createRoleIfNotFound(ROLE_ADMIN);
        createRoleIfNotFound(ROLE_USER);

        alreadySetup = true;
    }

    @Transactional
    public void createRoleIfNotFound(String name) {
        Optional<Role> optionalRole = roleRepository.findByName(name);

        if (optionalRole.isEmpty()) {
            Role role = new Role();
            role.setName(name);
            roleRepository.save(role);
        }
    }

}