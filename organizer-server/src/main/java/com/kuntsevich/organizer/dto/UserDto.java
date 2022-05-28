package com.kuntsevich.organizer.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class UserDto {

    @NotNull
    private String name;
    private String surname;
    @NotNull
    private String email;
    private Boolean isPremium;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
