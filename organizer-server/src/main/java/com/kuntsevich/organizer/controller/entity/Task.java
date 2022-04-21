package com.kuntsevich.organizer.controller.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime creationTime;
    private LocalDateTime completionTime;
    private LocalDateTime intervalFromTime;
    private LocalDateTime intervalToTime;
    @Enumerated
    private Priority priority;
    @Enumerated
    private TaskStatus taskStatus;
    @Enumerated
    private Regularity regularity;
    @ManyToOne
    private User user;
    @ManyToOne
    private TaskList taskList;
    @OneToMany
    private List<Note> notes;

}
