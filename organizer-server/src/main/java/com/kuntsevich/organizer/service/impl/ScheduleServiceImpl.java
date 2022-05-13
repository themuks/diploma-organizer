package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.entity.TimeRange;
import com.kuntsevich.organizer.model.Task;
import com.kuntsevich.organizer.repository.TaskRepository;
import com.kuntsevich.organizer.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final TaskRepository taskRepository;

    private List<TimeRange> findTimeSlotsForTimePeriod(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        List<Task> tasksForDay = taskRepository.findTasksForDay(startDateTime, endDateTime);

        TimeRange initialTimeRange = new TimeRange(startDateTime, endDateTime);
        List<TimeRange> timeRanges = new ArrayList<>(List.of(initialTimeRange));

        for (Task task : tasksForDay) {
            List<TimeRange> newTimeRanges = new ArrayList<>();

            for (TimeRange timeRange : timeRanges) {
                TimeRange taskTimeRange = new TimeRange(task.getStartTime(), task.getEndTime());

                if (isTimeRangesIntersect(timeRange, taskTimeRange)) {
                    newTimeRanges.addAll(excludeTimeRangeFromAnother(timeRange, taskTimeRange));
                } else {
                    newTimeRanges.add(timeRange);
                }

            }

            timeRanges = newTimeRanges;
        }

        return timeRanges;
    }

    public boolean placeTaskIntoTimeSlot(Task task) {
        LocalDate currentDate = LocalDate.now();
        boolean isPlaced = false;

        while (!isPlaced && !currentDate.isAfter(task.getDueTime().toLocalDate())) {
            LocalDateTime startDateTime = LocalDateTime.of(currentDate, LocalDate.now().compareTo(currentDate) == 0
                                                                        ? LocalTime.now()
                                                                        : LocalTime.MIN);
            LocalDateTime endDateTime = LocalDateTime.of(currentDate.plusDays(1), LocalTime.MIN);

            List<TimeRange> timeRanges = findTimeSlotsForTimePeriod(startDateTime, endDateTime);

            Optional<TimeRange> suitableSlot = findSuitableSlot(task, timeRanges);

            if (suitableSlot.isPresent()) {
                TimeRange timeRange = suitableSlot.get();
                task.setStartTime(timeRange.getStart());
                isPlaced = true;
            }

            currentDate = currentDate.plusDays(1);
        }

        return isPlaced;
    }

    private Optional<TimeRange> findSuitableSlot(Task task, List<TimeRange> timeRanges) {
        if (timeRanges.isEmpty()) {
            return Optional.empty();
        }

        if (Optional.ofNullable(task.getTaskComplexityInHours()).isEmpty()) {
            return Optional.of(timeRanges.get(0));
        }

        for (TimeRange timeRange : timeRanges) {
            long timeSlotCapacityInHours = timeRange.getStart().until(timeRange.getEnd(), ChronoUnit.HOURS);
            if (timeSlotCapacityInHours >= task.getTaskComplexityInHours()) {
                return Optional.of(timeRange);
            }
        }

        return Optional.empty();
    }

    private List<TimeRange> excludeTimeRangeFromAnother(TimeRange a, TimeRange b) {
        Map<String, LocalDateTime> map =
                Map.of("TIME_START", a.getStart(), "TIME_END", a.getEnd(), "RESTRICTION_START", b.getStart(),
                       "RESTRICTION_END", b.getEnd());
        SortedSet<Map.Entry<String, LocalDateTime>> set = new TreeSet<>(Map.Entry.comparingByValue());

        set.addAll(map.entrySet());

        List<TimeRange> timeRanges = new ArrayList<>();
        TimeRange currentTimeRange = new TimeRange();

        int active = 0;
        int exclude = 0;
        for (Map.Entry<String, LocalDateTime> entry : set) {
            switch (entry.getKey()) {
                case "TIME_START" -> {
                    active++;
                    if (active == 1 && exclude == 0) {
                        currentTimeRange = new TimeRange();
                        currentTimeRange.setStart(entry.getValue());
                    }
                }
                case "TIME_END" -> {
                    active--;
                    if (active == 0 && exclude == 0) {
                        currentTimeRange.setEnd(entry.getValue());
                        timeRanges.add(currentTimeRange);
                    }
                }
                case "RESTRICTION_START" -> {
                    exclude++;
                    if (active > 0 && exclude == 1) {
                        currentTimeRange.setEnd(entry.getValue());
                        timeRanges.add(currentTimeRange);
                    }
                }
                case "RESTRICTION_END" -> {
                    exclude--;
                    if (active > 0 && exclude == 0) {
                        currentTimeRange = new TimeRange();
                        currentTimeRange.setStart(entry.getValue());
                    }
                }
            }

        }

        return timeRanges;
    }

    private boolean isTimeRangesIntersect(TimeRange a, TimeRange b) {
        return !a.getStart().isAfter(b.getEnd()) && !a.getEnd().isBefore(b.getStart());
    }

}
