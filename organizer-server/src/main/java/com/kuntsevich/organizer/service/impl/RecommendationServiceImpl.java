package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.dto.RecommendationDto;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.Task;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.model.enumerated.TaskStatus;
import com.kuntsevich.organizer.repository.PreferencesRepository;
import com.kuntsevich.organizer.repository.TaskChangeRepository;
import com.kuntsevich.organizer.repository.TaskRepository;
import com.kuntsevich.organizer.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RecommendationServiceImpl implements RecommendationService {

    private final PreferencesRepository preferencesRepository;
    private final TaskRepository taskRepository;
    private final TaskChangeRepository taskChangeRepository;

    @Override
    public List<RecommendationDto> formRecommendations(User user) throws ServiceException {
        List<RecommendationDto> recommendations = new ArrayList<>();
        long todoTaskCount = taskRepository.countByUserAndTaskStatus(user, TaskStatus.TO_DO);

        if (todoTaskCount < 5) {
            RecommendationDto recommendationDto = new RecommendationDto();
            recommendationDto.setRecommendationCode("11");
            recommendationDto.setRelatedEntities(Collections.singletonList(todoTaskCount));
            recommendations.add(recommendationDto);
        }

        List<Task> expiredTasks = taskRepository.findExpiredTasks(user);

        if (expiredTasks.size() > 0) {
            RecommendationDto recommendationDto = new RecommendationDto();
            recommendationDto.setRecommendationCode("12");
            recommendationDto.setRelatedEntities(expiredTasks);
            recommendations.add(recommendationDto);
        }

        List<Task> planPendingTasks = taskRepository.findPlanPendingTasks(user);

        if (planPendingTasks.size() > 0) {
            RecommendationDto recommendationDto = new RecommendationDto();
            recommendationDto.setRecommendationCode("13");
            recommendationDto.setRelatedEntities(planPendingTasks);
            recommendations.add(recommendationDto);
        }

        return recommendations;
    }

}
