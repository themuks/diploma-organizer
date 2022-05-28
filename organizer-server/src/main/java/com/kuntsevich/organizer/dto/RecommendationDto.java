package com.kuntsevich.organizer.dto;

import lombok.Data;

import java.util.List;

@Data
public class RecommendationDto {

    private List<?> relatedEntities;
    private String recommendationCode;

}
