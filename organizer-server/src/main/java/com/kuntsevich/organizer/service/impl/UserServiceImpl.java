package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.dto.UserRegistrationDataDto;
import com.kuntsevich.organizer.exception.EntityNotFoundException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.exception.UserAlreadyExistException;
import com.kuntsevich.organizer.model.Preferences;
import com.kuntsevich.organizer.model.Role;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.model.enumerated.ActivityStatus;
import com.kuntsevich.organizer.repository.PreferencesRepository;
import com.kuntsevich.organizer.repository.RoleRepository;
import com.kuntsevich.organizer.repository.UserRepository;
import com.kuntsevich.organizer.service.EmailService;
import com.kuntsevich.organizer.service.UserService;
import com.kuntsevich.organizer.util.ObjectMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Streamable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class UserServiceImpl implements UserService {

    public static final String ROLE_USER = "ROLE_USER";
    private final EmailService emailService;
    private final PreferencesRepository preferencesRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                             .orElseThrow(
                                     () -> new EntityNotFoundException("User with email = (" + email + ") not found"));
    }

    @Override
    public List<User> findAll() {
        return Streamable.of(userRepository.findAll()).toList();
    }

    @Override
    public User update(User user) throws ServiceException {
        return userRepository.save(user);
    }

    @Override
    public User signUp(UserRegistrationDataDto userRegistrationDataDto)
            throws UserAlreadyExistException, ServiceException {
        String email = userRegistrationDataDto.getEmail();

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            throw new UserAlreadyExistException("User with email = (" + email + ") already exist");
        }

        User user = ObjectMapperUtils.map(userRegistrationDataDto, User.class);
        String encodedPassword = passwordEncoder.encode(userRegistrationDataDto.getPassword());
        user.setPassword(encodedPassword);
        user.setActivityStatus(ActivityStatus.INACTIVE);

        Optional<Role> optionalRole = roleRepository.findByName(ROLE_USER);

        if (optionalRole.isPresent()) {
            user.setRole(optionalRole.get());
        } else {
            throw new EntityNotFoundException("Role with name = (" + ROLE_USER + ") not found");
        }

        User savedUser = userRepository.save(user);

        Preferences preferences = new Preferences();
        preferences.setUser(savedUser);
        preferencesRepository.save(preferences);

        String secretCode = passwordEncoder.encode(user.getId() + user.getEmail());
        String url = UriComponentsBuilder.newInstance()
                                         .scheme("http")
                                         .host("localhost")
                                         .port(8080)
                                         .pathSegment("api", "users", "{id}", "activate")
                                         .queryParam("secretCode", secretCode)
                                         .encode()
                                         .build(savedUser.getId())
                                         .toString();

        emailService.sendSimpleMessage(email, "Organizer. Account activation", url);

        return savedUser;
    }

    @Override
    public boolean activateAccount(Long id, String secretCode) {
        User user = userRepository.findById(id)
                                  .orElseThrow(
                                          () -> new EntityNotFoundException("User with id = (" + id + ") not found"));

        if (passwordEncoder.matches(user.getId() + user.getEmail(), secretCode)) {
            user.setActivityStatus(ActivityStatus.ACTIVE);
            return true;
        }

        return false;
    }

}
