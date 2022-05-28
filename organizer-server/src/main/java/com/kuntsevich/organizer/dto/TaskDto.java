package com.kuntsevich.organizer.dto;

import com.kuntsevich.organizer.model.enumerated.Priority;
import com.kuntsevich.organizer.model.enumerated.TaskStatus;
import lombok.Data;

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
    private Long taskComplexityInHours;
    @Enumerated
    private Priority priority = Priority.NO_PRIORITY;
    @Enumerated
    private TaskStatus taskStatus = TaskStatus.TO_DO;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
