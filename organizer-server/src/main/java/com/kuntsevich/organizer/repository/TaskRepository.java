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

    Iterable<Task> findByUserAndTaskStatusOrderByTaskComplexityInHoursAscCreatedAtDesc(User user, TaskStatus taskStatus);

    @Query("select count(t) from Task t where t.startTime < ?1 and t.endTime > ?1")
    Integer countCollidingTasks(LocalDateTime dateTime);

    long countByUser(User user);

    long countByUserAndTaskStatus(User user, TaskStatus taskStatus);

    long countByUserAndCreatedAtAfter(User user, LocalDateTime after);

    @Query("select sum(t.taskComplexityInHours) from Task t where t.taskComplexityInHours is not null and t.user = :user")
    Long getSumOfPendingWorkingHours(User user);

    @Query("select t from Task t where (t.startTime >= ?1 or t.startTime <= ?2) and t.taskStatus = ?3 order by t"
            + ".startTime")
    List<Task> findTasksForDay(LocalDateTime min, LocalDateTime max, TaskStatus status);

    List<Task> findDistinctByUserAndTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(User user,
                                                                                               String title,
                                                                                                  String description);

    @Query("select t from Task t where t.user = :user and t.dueTime is not null and t.dueTime < CURRENT_TIMESTAMP() and t.taskStatus = 'TO_DO'")
    List<Task> findExpiredTasks(User user);

    @Query("select t from Task t where t.user = :user and (t.title like %:query% or t.description like %:query%)")
    List<Task> search(User user, String query);

    @Query("select t from Task t where t.user = :user and t.startTime is null and t.taskStatus = 'TO_DO'")
    List<Task> findPlanPendingTasks(User user);

}
