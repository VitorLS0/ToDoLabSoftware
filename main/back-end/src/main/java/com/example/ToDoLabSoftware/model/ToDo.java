package com.example.ToDoLabSoftware.model;

import jakarta.persistence.*;
import java.util.Date;


@Entity
@Table(name="todo")
public class ToDo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String title;

    @Column
    private Date date; // For tasks with a specific conclusion date

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
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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
