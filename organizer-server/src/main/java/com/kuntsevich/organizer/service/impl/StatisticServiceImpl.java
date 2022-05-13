package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.dto.UserStatisticsDto;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.repository.TaskChangeRepository;
import com.kuntsevich.organizer.repository.TaskRepository;
import com.kuntsevich.organizer.repository.UserRepository;
import com.kuntsevich.organizer.service.StatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class StatisticServiceImpl implements StatisticService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final TaskChangeRepository taskChangeRepository;

    @Override
    public UserStatisticsDto formUserStatistics(User user) throws ServiceException {
        UserStatisticsDto userStatisticsDto = new UserStatisticsDto();

//        userStatisticsDto.setTotalTasksCreated();
//        userStatisticsDto.setTotalNotesCreated();
//        userStatisticsDto.setTotalRemindersCreated();
//        userStatisticsDto.setTasksCreatedLastWeek();
//        userStatisticsDto.setTasksCompletedLastWeek();
//        userStatisticsDto.setTasksCompletedComparedWithPreviousWeek();
//        userStatisticsDto.setWorkingHoursPending();

        return userStatisticsDto;
    }

    @Override
    public Map<LocalDateTime, Long> someMethod(User user) throws ServiceException {
        return null;
    }

}
