package com.kuntsevich.organizer.security;

import com.kuntsevich.organizer.controller.entity.Role;
import com.kuntsevich.organizer.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private boolean alreadySetup = false;

    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_USER = "USER";
    private final MySqlUserDetailsService userDetailsService;
    private final RoleRepository roleRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
            .disable().csrf().disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.POST, "/api/users").permitAll()
            .antMatchers("/api/users").hasAuthority(ROLE_ADMIN)
//            .antMatchers("/api/tasks").hasRole(ROLE_USER)
            .anyRequest().authenticated()
            .and()
            .httpBasic()
            .and()
            .formLogin();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
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
    public Role createRoleIfNotFound(String name) {

        Optional<Role> optionalRole = roleRepository.findByName(name);

        if (optionalRole.isEmpty()) {
            Role role = new Role();
            role.setName(name);
            role = roleRepository.save(role);

            return role;
        } else {
            return optionalRole.get();
        }
    }

}