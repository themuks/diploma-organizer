package com.kuntsevich.organizer.repository;

import com.kuntsevich.organizer.model.TaskChange;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.model.enumerated.TaskField;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;

public interface TaskChangeRepository extends CrudRepository<TaskChange, Long> {

    @Query("select count(t) from TaskChange t where t.task.user = :user and t.taskField = :taskField and t.newValue ="
            + " :newValue and t.createdAt between :after and :before")
    long countDistinctByUserAndTaskFieldAndNewValueAndCreatedAtBetween(User user,
                                                                       TaskField taskField,
                                                                       String newValue,
                                                                       LocalDateTime after,
                                                                       LocalDateTime before);

}
