package com.kuntsevich.organizer.service;

import com.kuntsevich.organizer.exception.ServiceException;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BaseService<T, ID> {

    T save(T entity) throws ServiceException;

    List<T> findAll(Pageable pageable) throws ServiceException;

    T findById(ID id) throws ServiceException;

    T update(T entity) throws ServiceException;

    T delete(ID id) throws ServiceException;

}
