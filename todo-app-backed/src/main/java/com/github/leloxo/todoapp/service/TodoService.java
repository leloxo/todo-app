package com.github.leloxo.todoapp.service;

import com.github.leloxo.todoapp.exception.TodoNotFoundException;
import com.github.leloxo.todoapp.exception.TodoSaveException;
import com.github.leloxo.todoapp.model.Todo;
import com.github.leloxo.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo getTodoById(Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException(id));
    }

    public Todo saveTodo(Todo todo) {
        try {
            return todoRepository.save(todo);
        } catch (Exception e) {
            throw new TodoSaveException(e.getMessage());
        }
    }

    public Todo updateTodo(Long id, Todo todo) {
        if (!todoRepository.existsById(id)) {
            throw new TodoNotFoundException(id);
        }
        todo.setId(id);
        return saveTodo(todo);
    }

    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new TodoNotFoundException(id);
        }
        todoRepository.deleteById(id);
    }
}
