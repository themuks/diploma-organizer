package com.kuntsevich.organizer.repository;

import com.kuntsevich.organizer.entity.Note;
import com.kuntsevich.organizer.entity.Task;
import com.kuntsevich.organizer.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface NoteRepository extends CrudRepository<Note, Long> {

    Page<Note> findByUser(User user, Pageable pageable);

}
