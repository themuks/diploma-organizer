package com.kuntsevich.organizer.dto;

import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.model.enumerated.Goal;
import com.kuntsevich.organizer.model.enumerated.Language;
import com.kuntsevich.organizer.model.enumerated.Theme;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class PreferencesDto {

    private Long id;
    @NotNull
    private Goal goal;
    @NotNull
    private Theme theme;
    @NotNull
    private Language language;
    @NotNull
    private LocalTime workStartTime;
    @NotNull
    private LocalTime workEndTime;
    @NotNull
    private Long gapBetweenTasksInMinutes;
    private User user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
