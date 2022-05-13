package com.kuntsevich.organizer.model;

import com.kuntsevich.organizer.model.enumerated.ActivityStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String surname;
    @Email
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private Boolean isPremium = false;
    private String password;
    @ManyToOne(optional = false)
    private Role role;
    @Enumerated
    private ActivityStatus activityStatus;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
