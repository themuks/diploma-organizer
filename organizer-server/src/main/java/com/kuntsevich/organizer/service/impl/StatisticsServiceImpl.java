package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.dto.UserStatisticsDto;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.model.enumerated.TaskField;
import com.kuntsevich.organizer.repository.NoteRepository;
import com.kuntsevich.organizer.repository.ReminderRepository;
import com.kuntsevich.organizer.repository.TaskChangeRepository;
import com.kuntsevich.organizer.repository.TaskRepository;
import com.kuntsevich.organizer.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class StatisticsServiceImpl implements StatisticsService {

    private final TaskRepository taskRepository;
    private final NoteRepository noteRepository;
    private final ReminderRepository reminderRepository;
    private final TaskChangeRepository taskChangeRepository;

    @Override
    public UserStatisticsDto formUserStatistics(User user) {
        UserStatisticsDto userStatisticsDto = new UserStatisticsDto();

        long taskCount = taskRepository.countByUser(user);
        userStatisticsDto.setTotalTasksCreated(taskCount);

        long noteCount = noteRepository.countByUser(user);
        userStatisticsDto.setTotalNotesCreated(noteCount);

        long reminderCount = reminderRepository.countByUser(user);
        userStatisticsDto.setTotalRemindersCreated(reminderCount);

        LocalDateTime now = LocalDateTime.now();

        long created = taskRepository.countByUserAndCreatedAtAfter(user, now.minusWeeks(1));
        userStatisticsDto.setTasksCreatedLastWeek(created);

        long donePreviousWeek = taskChangeRepository.countDistinctByUserAndTaskFieldAndNewValueAndCreatedAtBetween(user,
                                                                                                                   TaskField.STATUS,
                                                                                                                   "DONE",
                                                                                                                   now.minusWeeks(
                                                                                                                           1),
                                                                                                                   now);
        userStatisticsDto.setTasksCompletedLastWeek(donePreviousWeek);

        double doneWeekAgo = taskChangeRepository.countDistinctByUserAndTaskFieldAndNewValueAndCreatedAtBetween(user,
                                                                                                                TaskField.STATUS,
                                                                                                                "DONE",
                                                                                                                now.minusWeeks(
                                                                                                                        2),
                                                                                                                now.minusWeeks(
                                                                                                                        1));
        userStatisticsDto.setTasksCompletedComparedWithPreviousWeek(
                doneWeekAgo != 0 ? (double) donePreviousWeek / doneWeekAgo - 1d : 0);


        Long sumOfPendingWorkingHours = taskRepository.getSumOfPendingWorkingHours(user);
        userStatisticsDto.setWorkingHoursPending(sumOfPendingWorkingHours);


        return userStatisticsDto;
    }

}
