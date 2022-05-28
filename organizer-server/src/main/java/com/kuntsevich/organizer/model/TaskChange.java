package com.kuntsevich.organizer.model;

import com.kuntsevich.organizer.model.enumerated.TaskField;
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
public class TaskChange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated
    private TaskField taskField;
    private String newValue;
    @ManyToOne(optional = false)
    private Task task;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
