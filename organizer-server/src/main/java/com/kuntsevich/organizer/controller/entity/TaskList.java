package com.kuntsevich.organizer.controller.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class TaskList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToOne
    private User user;
    @OneToMany
    private List<Task> tasks;

}
