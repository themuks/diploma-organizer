package com.kuntsevich.organizer.service.impl;

import com.kuntsevich.organizer.exception.EntityNotFoundException;
import com.kuntsevich.organizer.exception.OperationForbiddenException;
import com.kuntsevich.organizer.model.Reminder;
import com.kuntsevich.organizer.model.User;
import com.kuntsevich.organizer.repository.ReminderRepository;
import com.kuntsevich.organizer.service.ReminderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
@Transactional
public class ReminderServiceImpl implements ReminderService {

    private final ReminderRepository reminderRepository;
    private final ModelMapper modelMapper;

    public Reminder create(User user, Reminder reminder) {
        reminder.setUser(user);
        return reminderRepository.save(reminder);
    }

    public Reminder delete(User user, Long id) throws OperationForbiddenException {
        Reminder reminder = reminderRepository.findById(id)
                                              .orElseThrow(() -> new EntityNotFoundException(
                                                      "Reminder with id = (" + id + ") not found"));

        if (!Objects.equals(reminder.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the delete operation");
        }

        reminderRepository.deleteById(id);
        return reminder;
    }

    @Override
    public List<Reminder> findUserReminders(User user, Pageable pageable) {
        return reminderRepository.findByUser(user, pageable).getContent();
    }

    @Override
    public Reminder findUserReminder(User user, Long id) throws OperationForbiddenException {
        Reminder reminder = reminderRepository.findById(id)
                                              .orElseThrow(() -> new EntityNotFoundException(
                                                      "Reminder with id = (" + id + ") not found"));

        if (!Objects.equals(reminder.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the update operation");
        }

        return reminder;
    }

    @Override
    public Reminder update(User user, Long id, Reminder newReminder) throws OperationForbiddenException {
        Reminder reminder = reminderRepository.findById(id)
                                              .orElseThrow(() -> new EntityNotFoundException(
                                                      "Reminder with id = (" + newReminder.getId() + ") not found"));

        if (!Objects.equals(reminder.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the update operation");
        }

        newReminder.setId(id);
        newReminder.setUser(user);

        return reminderRepository.save(newReminder);
    }

    @Override
    public Reminder partialUpdate(User user, Long id, Reminder newReminder) throws OperationForbiddenException {
        Reminder reminder = reminderRepository.findById(id)
                                              .orElseThrow(() -> new EntityNotFoundException(
                                                      "Reminder with id = (" + newReminder.getId() + ") not found"));

        if (!Objects.equals(reminder.getUser().getId(), user.getId())) {
            throw new OperationForbiddenException("User is not allowed to perform the update operation");
        }

        modelMapper.map(newReminder, reminder);

        return reminderRepository.save(reminder);
    }

}
