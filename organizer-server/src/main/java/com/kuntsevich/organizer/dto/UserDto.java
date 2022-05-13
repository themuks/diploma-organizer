package com.kuntsevich.organizer.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {

    private String name;
    private String surname;
    private String email;

    private Boolean isPremium;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
