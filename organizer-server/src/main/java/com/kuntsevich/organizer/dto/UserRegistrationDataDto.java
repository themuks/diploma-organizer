package com.kuntsevich.organizer.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UserRegistrationDataDto {

    @NotNull
    private final String email;
    @NotNull
    private final String password;
    @NotNull
    private final String name;
    private final String surname;

}
