package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.dto.RecommendationDto;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.repository.PreferencesRepository;
import com.kuntsevich.organizer.repository.TaskChangeRepository;
import com.kuntsevich.organizer.repository.TaskRepository;
import com.kuntsevich.organizer.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RecommendationServiceImpl implements RecommendationService {

    private final PreferencesRepository preferencesRepository;
    private final TaskRepository taskRepository;
    private final TaskChangeRepository taskChangeRepository;

    @Override
    public List<RecommendationDto> formRecommendations(User user) throws ServiceException {


        return null;
    }

}
