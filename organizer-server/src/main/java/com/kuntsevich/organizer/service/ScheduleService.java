package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.model.Task;

import java.time.LocalTime;

public interface ScheduleService {

    boolean placeTaskIntoTimeSlot(Task task, LocalTime workStartTime, LocalTime workEndTime, long gapInMinutes);

}
