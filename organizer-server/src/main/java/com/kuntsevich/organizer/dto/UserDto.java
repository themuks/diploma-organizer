package com.kuntsevich.organizer.dto;

import com.kuntsevich.organizer.entity.ActivityStatus;
import com.kuntsevich.organizer.entity.Gender;
import com.kuntsevich.organizer.entity.Role;

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
