package com.kuntsevich.organizer.dto;

import lombok.Data;

@Data
public class UserStatisticsDto {

    private Long totalTasksCreated;
    private Long totalNotesCreated;
    private Long totalRemindersCreated;
    private Long tasksCreatedLastWeek;
    private Long tasksCompletedLastWeek;
    private Long tasksCompletedComparedWithPreviousWeek;
    private Long workingHoursPending;

}
