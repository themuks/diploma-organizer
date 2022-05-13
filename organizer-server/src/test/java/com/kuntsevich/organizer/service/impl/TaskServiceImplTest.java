package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.repository.PreferencesRepository;
import com.kuntsevich.organizer.repository.TaskRepository;
import com.kuntsevich.organizer.repository.UserRepository;
import lombok.Data;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.*;

@SpringBootTest
class TaskServiceImplTest {

    @InjectMocks
    TaskServiceImpl taskService;
    @Mock
    TaskRepository taskRepository;
    @Mock
    UserRepository userRepository;
    @Mock
    PreferencesRepository preferencesRepository;

    private boolean isIntersect(Range range1, Range range2) {
        return range1.start <= range2.end && range1.end >= range2.start;
    }

    @Test
    void notIntersectLeft() {
        Range range1 = new Range(0, 10);
        Range range2 = new Range(20, 30);
        Assertions.assertFalse(isIntersect(range1, range2));
    }

    @Test
    void notIntersectRight() {
        Range range1 = new Range(30, 50);
        Range range2 = new Range(0, 5);
        Assertions.assertFalse(isIntersect(range1, range2));
    }

    @Test
    void intersectPartiallyLeft() {
        Range range1 = new Range(0, 10);
        Range range2 = new Range(5, 30);
        Assertions.assertTrue(isIntersect(range1, range2));
    }

    @Test
    void intersectPartiallyRight() {
        Range range1 = new Range(6, 30);
        Range range2 = new Range(0, 8);
        Assertions.assertTrue(isIntersect(range1, range2));
    }

    @Test
    void intersectFirstInSecond() {
        Range range1 = new Range(10, 20);
        Range range2 = new Range(5, 30);
        Assertions.assertTrue(isIntersect(range1, range2));
    }

    @Test
    void intersectSecondInFirst() {
        Range range1 = new Range(5, 30);
        Range range2 = new Range(10, 20);
        Assertions.assertTrue(isIntersect(range1, range2));
    }

    private List<TimeRange> excludeTimeRangeFromAnother(TimeRange a, TimeRange b) {
        Map<String, LocalDateTime> map =
                Map.of("TIME_START", a.start, "TIME_END", a.end, "RESTRICTION_START", b.start, "RESTRICTION_END",
                       b.end);
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

    @Data
    class Range {

        private final int start;
        private final int end;

    }

    @Data
    class TimeRange {

        private LocalDateTime start;
        private LocalDateTime end;

    }

}