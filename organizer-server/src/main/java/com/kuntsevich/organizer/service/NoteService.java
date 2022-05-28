package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.model.Note;
import com.kuntsevich.organizer.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NoteService {

    Note delete(User user, Long id) throws ServiceException, OperationForbiddenException;

    Note create(User user, Note note) throws ServiceException;

    List<Note> findUserNotes(User user, Pageable pageable) throws ServiceException;

    Note findUserNote(User user, Long id) throws ServiceException, OperationForbiddenException;

    Note update(User user, Long id, Note note) throws ServiceException, OperationForbiddenException;

}
