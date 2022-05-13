package com.kuntsevich.organizer.repository;

import com.kuntsevich.organizer.model.Reminder;
import com.kuntsevich.organizer.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface ReminderRepository extends CrudRepository<Reminder, Long> {

    Page<Reminder> findByUser(User user, Pageable pageable);

}
