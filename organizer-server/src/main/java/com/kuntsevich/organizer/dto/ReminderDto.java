package com.kuntsevich.organizer.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class ReminderDto {

    private Long id;
    @NotNull
    private String title;
    private String description;
    @NotNull
    private LocalDateTime dateTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
