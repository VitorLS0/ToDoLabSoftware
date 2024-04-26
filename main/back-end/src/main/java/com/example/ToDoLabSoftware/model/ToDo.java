package com.example.ToDoLabSoftware.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="todo")
public class ToDo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private LocalDateTime dateTime; // For tasks with a specific conclusion date and time

    @Column
    private Integer daysUntilTerm; // For tasks with counted days until term

    @Column
    private String status;

    @Enumerated(EnumType.STRING)
    @Column
    private TaskType taskType; // To indicate the type of task

    @Enumerated(EnumType.STRING)
    @Column
    private Priority priority; // To indicate the priority of the task

    // Default constructor
    public ToDo() {
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Integer getDaysUntilTerm() {
        return daysUntilTerm;
    }

    public void setDaysUntilTerm(Integer daysUntilTerm) {
        this.daysUntilTerm = daysUntilTerm;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }
}
