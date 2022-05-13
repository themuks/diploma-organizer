package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.model.Task;

public interface ScheduleService {

    boolean placeTaskIntoTimeSlot(Task task);

}
