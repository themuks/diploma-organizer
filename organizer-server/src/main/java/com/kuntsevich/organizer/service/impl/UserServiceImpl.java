package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.dto.UserRegistrationData;
import com.kuntsevich.organizer.entity.Role;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.exception.UserAlreadyExistException;
import com.kuntsevich.organizer.repository.RoleRepository;
import com.kuntsevich.organizer.repository.UserRepository;
import com.kuntsevich.organizer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Streamable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class UserServiceImpl implements UserService {

    public static final String ROLE_USER = "USER";
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public User findUserByEmail(String email) throws ServiceException {
        return userRepository.findByEmail(email)
                             .orElseThrow(() -> new ServiceException("User with email = (" + email + ") not found"));
    }

    @Override
    public List<User> findAll() {
        return Streamable.of(userRepository.findAll()).toList();
    }

    @Override
    public User signUp(UserRegistrationData userRegistrationData) throws ServiceException, UserAlreadyExistException {
        String email = userRegistrationData.email();

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            throw new UserAlreadyExistException("User with email = (" + email + ") already exist");
        }

        User user = new User();
        String encodedPassword = passwordEncoder.encode(userRegistrationData.password());
        user.setEmail(userRegistrationData.email());
        user.setPassword(encodedPassword);

        Optional<Role> optionalRole = roleRepository.findByName(ROLE_USER);

        if (optionalRole.isPresent()) {
            user.setRole(optionalRole.get());
        } else {
            throw new ServiceException("Role with name = (" + ROLE_USER + ") not found");
        }

        return userRepository.save(user);
    }

}
