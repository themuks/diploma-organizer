package com.kuntsevich.organizer.controller.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    @Enumerated
    private Gender gender;
    @Email
    private String email;
    private String password;
    @ManyToOne
    private Role role;
    @Enumerated
    private ActivityStatus activityStatus;
    private LocalDateTime registrationTime;

}
