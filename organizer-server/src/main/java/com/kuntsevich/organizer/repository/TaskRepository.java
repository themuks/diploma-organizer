package com.kuntsevich.organizer.repository;

import com.kuntsevich.organizer.controller.entity.Task;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {

}
