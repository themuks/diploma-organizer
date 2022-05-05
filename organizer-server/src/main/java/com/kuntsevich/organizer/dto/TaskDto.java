package com.kuntsevich.organizer.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kuntsevich.organizer.entity.Priority;
import com.kuntsevich.organizer.entity.Regularity;
import com.kuntsevich.organizer.entity.TaskStatus;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class TaskDto {

    private Long id;
    @NotNull
    private String title;
    private String description;
    private LocalDateTime dueTime;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Enumerated
    private Priority priority = Priority.NO_PRIORITY;
    @Enumerated
    private TaskStatus taskStatus = TaskStatus.TO_DO;
    @Enumerated
    private Regularity regularity = Regularity.NOT_REGULAR;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
