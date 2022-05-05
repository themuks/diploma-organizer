package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.entity.Note;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface NoteService {

    Note delete(User user, Long id) throws ServiceException, OperationForbiddenException;

    Note create(User user, Note note) throws ServiceException;

    List<Note> findUserNotes(User user, Pageable pageable) throws ServiceException;

    Note findUserNote(User user, Long id) throws ServiceException, OperationForbiddenException;

    Note update(User user, Long id, Note note) throws ServiceException, OperationForbiddenException;

}
