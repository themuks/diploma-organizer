package com.kuntsevich.organizer.dto;

import com.kuntsevich.organizer.controller.entity.ActivityStatus;
import com.kuntsevich.organizer.controller.entity.Gender;
import com.kuntsevich.organizer.controller.entity.Role;

import java.time.LocalDateTime;

public record UserDto(Long id,
                      String name,
                      String surname,
                      Gender gender,
                      String email,
                      Role role,
                      ActivityStatus activityStatus,
                      LocalDateTime registrationTime) {

}
