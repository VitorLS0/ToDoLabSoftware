package com.example.ToDoLabSoftware.service;

import com.example.ToDoLabSoftware.model.ToDo;
import com.example.ToDoLabSoftware.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
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
        return repository.findById(id).orElse(null);
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
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return !repository.existsById(id);
        }
        return false;
    }

    public String getTaskDetails(Long id) {
        ToDo task = repository.findById(id).orElse(null);
        if (task == null) {
            return "Task not found";
        }

        StringBuilder details = new StringBuilder();
        details.append("Title: ").append(task.getTitle()).append("\n");
        details.append("Status: ").append(task.getStatus()).append("\n");
        details.append("Priority: ").append(task.getPriority()).append("\n");
        details.append("Type: ").append(task.getTaskType()).append("\n");

        LocalDate today = LocalDate.now();
        switch (task.getTaskType()) {
            case SPECIFIC_DATE:
                if (task.getDate() != null) {
                    LocalDate taskDate = task.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    long daysBetween = java.time.temporal.ChronoUnit.DAYS.between(today, taskDate);
                    if (daysBetween < 0) {
                        details.append("Days Late: ").append(Math.abs(daysBetween)).append("\n");
                    } else {
                        details.append("Days Until Conclusion: ").append(daysBetween).append("\n");
                    }
                }
                break;
            case COUNTED_DAYS:
                if (task.getDaysUntilTerm() != null) {
                    details.append("Days Until Term: ").append(task.getDaysUntilTerm()).append("\n");
                }
                break;
            case NO_ESTIMATED_TIME:
                details.append("No Estimated Time for Conclusion\n");
                break;
        }

        return details.toString();
    }
}