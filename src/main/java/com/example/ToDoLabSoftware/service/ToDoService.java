package com.example.ToDoLabSoftware.service;

import com.example.ToDoLabSoftware.model.ToDo;
import com.example.ToDoLabSoftware.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ToDoService {

    @Autowired
    ToDoRepository repository;

    public List<ToDo> getAllItems() {
        ArrayList<ToDo> todoList = new ArrayList<>();
        repository.findAll().forEach(todo -> todoList.add(todo));

        return todoList;
    }

    public ToDo getItemById(Long id) {
        return repository.findById(id).get();
    }

    public boolean updateStatus(Long id) {
        ToDo todo = getItemById(id);
        todo.setStatus("Completed");

        return save(todo);
    }

    public boolean save(ToDo todo) {
        ToDo updateObj = repository.save(todo);

        return getItemById(updateObj.getId()) != null;
    }

    public boolean deleteItem(Long id) {
        repository.deleteById(id);

        return getItemById(id) == null;
    }
}
