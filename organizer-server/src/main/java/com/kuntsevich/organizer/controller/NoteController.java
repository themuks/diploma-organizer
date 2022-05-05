package com.kuntsevich.organizer.controller;

import com.kuntsevich.organizer.entity.Note;
import com.kuntsevich.organizer.entity.User;
import com.kuntsevich.organizer.exception.ApiResponse;
import com.kuntsevich.organizer.exception.ControllerException;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.exception.ServiceException;
import com.kuntsevich.organizer.service.NoteService;
import com.kuntsevich.organizer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private static final String ENTITY_CODE = "3";
    private final NoteService noteService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Note> create(Authentication authentication, @RequestBody Note note) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            Note savedNote = noteService.create(user, note);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedNote);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

    @GetMapping
    public ResponseEntity<List<Note>> findAll(Authentication authentication, Pageable pageable) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            return ResponseEntity.ok(noteService.findUserNotes(user, pageable));
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Object> findById(Authentication authentication, @PathVariable Long id) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            return ResponseEntity.ok(noteService.findUserNote(user, id));
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        } catch (OperationForbiddenException e) {
            ApiResponse apiResponse =
                    new ApiResponse(e.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN + ENTITY_CODE);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
        }
    }

    @PatchMapping("{id}")
    public ResponseEntity<Object> update(Authentication authentication, @PathVariable Long id, @RequestBody Note note) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            Note updatedNote = noteService.update(user, id, note);
            return ResponseEntity.ok(updatedNote);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        } catch (OperationForbiddenException e) {
            ApiResponse apiResponse =
                    new ApiResponse(e.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN + ENTITY_CODE);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(Authentication authentication, @PathVariable Long id) {
        String email = authentication.getName();
        User user;

        try {
            user = userService.findUserByEmail(email);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        }

        try {
            Note deletedNote = noteService.delete(user, id);
            return ResponseEntity.ok(deletedNote);
        } catch (ServiceException e) {
            throw new ControllerException(e, ENTITY_CODE);
        } catch (OperationForbiddenException e) {
            ApiResponse apiResponse =
                    new ApiResponse(e.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN + ENTITY_CODE);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
        }
    }

}
