package com.kuntsevich.organizer.model;

import com.kuntsevich.organizer.model.enumerated.Priority;
import com.kuntsevich.organizer.model.enumerated.TaskStatus;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private LocalDateTime dueTime;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long taskComplexityInHours;
    @Enumerated
    private Priority priority = Priority.NO_PRIORITY;
    @Enumerated
    private TaskStatus taskStatus = TaskStatus.TO_DO;
    @ManyToOne(optional = false)
    private User user;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
