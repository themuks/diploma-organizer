package com.kuntsevich.organizer.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Task extends AbstractEntity {

    private String title;
    private String description;
    private LocalDateTime dueTime;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Enumerated
    private Priority priority = Priority.NO_PRIORITY;
    @Enumerated
    private TaskStatus taskStatus = TaskStatus.TO_DO;
    @Enumerated
    private Regularity regularity = Regularity.NOT_REGULAR;
    @ManyToOne(optional = false)
    private User user;

}
