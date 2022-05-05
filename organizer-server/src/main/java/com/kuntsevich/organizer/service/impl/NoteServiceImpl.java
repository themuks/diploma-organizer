package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.entity.Note;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.EntityNotFoundException;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.repository.NoteRepository;
import com.kuntsevich.organizer.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;

    @Override
    public Note delete(User user, Long id) throws OperationForbiddenException {
        Note note = noteRepository.findById(id)
                                  .orElseThrow(
                                          () -> new EntityNotFoundException("Note with id = (" + id + ") not found"));

        if (!Objects.equals(note.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the delete operation");
        }

        noteRepository.deleteById(id);
        return note;
    }

    @Override
    public Note create(User user, Note note) {
        note.setId(user.getId());
        return noteRepository.save(note);
    }

    @Override
    public List<Note> findUserNotes(User user, Pageable pageable) {
        return noteRepository.findByUser(user, pageable).getContent();
    }

    @Override
    public Note findUserNote(User user, Long id) throws OperationForbiddenException {
        Note note = noteRepository.findById(id)
                                  .orElseThrow(
                                          () -> new EntityNotFoundException("Note with id = (" + id + ") not found"));

        if (!Objects.equals(note.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the update operation");
        }

        return note;
    }

    @Override
    public Note update(User user, Long id, Note newNote) throws OperationForbiddenException {
        Note note = noteRepository.findById(id)
                                  .orElseThrow(() -> new EntityNotFoundException(
                                          "Note with id = (" + newNote.getId() + ") not found"));

        if (!Objects.equals(note.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the update operation");
        }

        note.setId(id);
        note.setTitle(Optional.of(newNote.getTitle()).orElse(note.getTitle()));
        note.setText(Optional.of(newNote.getText()).orElse(note.getText()));

        return noteRepository.save(note);
    }

}
