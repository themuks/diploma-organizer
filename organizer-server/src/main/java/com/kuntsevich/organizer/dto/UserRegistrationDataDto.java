package com.kuntsevich.organizer.dto;

import lombok.Data;

@Data
public class UserRegistrationDataDto {

    private final String email;
    private final String password;
    private final String name;
    private final String surname;

}
