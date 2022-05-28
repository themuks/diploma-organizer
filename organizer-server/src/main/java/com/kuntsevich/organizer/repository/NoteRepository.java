package com.kuntsevich.organizer.repository;

import com.kuntsevich.organizer.model.Note;
import com.kuntsevich.organizer.model.Task;
import com.kuntsevich.organizer.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NoteRepository extends CrudRepository<Note, Long> {

    Page<Note> findByUser(User user, Pageable pageable);

    long countByUser(User user);

    @Query("select n from Note n where n.user = :user and (n.title like %:query% or n.text like %:query%)")
    List<Note> search(User user, String query);

}
