package com.kuntsevich.organizer.repository;

import com.kuntsevich.organizer.entity.Task;
import com.kuntsevich.organizer.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {

    Page<Task> findByUserOrderByTaskStatusAscUpdatedAtDesc(User user, Pageable pageable);

}
