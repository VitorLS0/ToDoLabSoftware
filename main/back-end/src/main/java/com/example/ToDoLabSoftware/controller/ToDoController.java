package com.example.ToDoLabSoftware.controller;

import com.example.ToDoLabSoftware.model.ToDo;
import com.example.ToDoLabSoftware.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class ToDoController {

    @Autowired
    private ToDoService service;

    @GetMapping("/listAll")
    public ResponseEntity<List<ToDo>> listAll() {
        List<ToDo> toDoList = service.getAllItems();

        return ResponseEntity.ok(toDoList);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<ToDo> findById(@PathVariable Long id) {
        ToDo todo = service.getItemById(id);

        return ResponseEntity.ok(todo);
    }

    @PutMapping("/editById/{id}")
    public ResponseEntity<String> editById(@PathVariable Long id, @RequestBody ToDo todo) {
        todo.setId(id);
        boolean edited = service.save(todo);
        if (edited) {
            return ResponseEntity.ok("Edit successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to edit");
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        boolean deleted = service.deleteItem(id);
        if (deleted) {
            return ResponseEntity.ok("Delete successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete");
        }
    }

    @PostMapping("/createTask")
    public ResponseEntity<ToDo> createTask(@RequestBody ToDo todo) {
        boolean taskCreated = service.save(todo);
        if (taskCreated) {
            return ResponseEntity.ok(todo);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
