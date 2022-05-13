package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.dto.RecommendationDto;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.User;

import java.util.List;

public interface RecommendationService {

    List<RecommendationDto> formRecommendations(User user) throws ServiceException;

}
