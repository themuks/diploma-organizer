package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.dto.UserStatisticsDto;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.User;

import java.time.LocalDateTime;
import java.util.Map;

public interface StatisticsService {

    UserStatisticsDto formUserStatistics(User user) throws ServiceException;

}
