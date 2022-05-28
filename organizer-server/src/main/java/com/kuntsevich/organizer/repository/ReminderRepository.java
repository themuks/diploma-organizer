package com.kuntsevich.organizer.repository;

import com.kuntsevich.organizer.model.Reminder;
import com.kuntsevich.organizer.model.Task;
import com.kuntsevich.organizer.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReminderRepository extends CrudRepository<Reminder, Long> {

    Page<Reminder> findByUser(User user, Pageable pageable);

    long countByUser(User user);

    @Query("select r from Reminder r where r.user = :user and (r.title like %:query% or r.description like %:query%)")
    List<Reminder> search(User user, String query);

}
