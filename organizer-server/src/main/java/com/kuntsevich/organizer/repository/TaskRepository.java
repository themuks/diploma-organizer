package com.kuntsevich.organizer.repository;

import com.kuntsevich.organizer.model.Task;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.model.enumerated.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {

    Page<Task> findByUserOrderByTaskStatusAscUpdatedAtDesc(User user, Pageable pageable);

    Iterable<Task> findByUserAndTaskStatusOrderByPriorityDescCreatedAtDesc(User user, TaskStatus taskStatus);

    @Query("select count(t) from Task t where t.startTime < ?1 and t.endTime > ?1")
    Integer countCollidingTasks(LocalDateTime dateTime);

    @Query("select t from Task t where t.startTime >= ?1 and t.endTime <= ?2 order by t.startTime")
    List<Task> findTasksForDay(LocalDateTime min, LocalDateTime max);

}
