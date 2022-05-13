package com.kuntsevich.organizer.model;

import com.kuntsevich.organizer.model.enumerated.Goal;
import com.kuntsevich.organizer.model.enumerated.Language;
import com.kuntsevich.organizer.model.enumerated.Theme;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Entity
public class Preferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated
    private Goal goal = Goal.NO_GOAL;
    @Enumerated
    private Theme theme = Theme.AUTO;
    @Enumerated
    private Language language = Language.AUTO;
    private LocalTime workStartTime = LocalTime.of(8, 0);
    private LocalTime workEndTime = LocalTime.of(21, 0);
    private Long gapBetweenTasksInMinutes = 30L;
    @ManyToOne(optional = false)
    private User user;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
