import React, { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [error, setError] = useState<string | null>(null);

  type PriorityType = "HIGH" | "MEDIUM" | "LOW";

  interface TaskData {
    id: number;
    title: string;
    description: string;
    dateTime: string;
    daysUntilTerm: number;
    priority: PriorityType;
    completed: boolean;
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:8080/api/listAll")
      .then((response) => {
        const priorityValues: { [key in PriorityType]: number } = {
          HIGH: 1,
          MEDIUM: 2,
          LOW: 3,
        };

        const sortedTasks = response.data.sort((a: TaskData, b: TaskData) => {
          const getPriorityValue = (priority: string): number => {
            return priorityValues[priority as PriorityType] || 999;
          };

          return getPriorityValue(a.priority) - getPriorityValue(b.priority);
        });

        setTasks(sortedTasks);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
        setError("Failed to fetch tasks");
      });
  };

  const onDelete = (id: number) => {
    axios
      .delete(`http://localhost:8080/api/deleteById/${id}`)
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
        setError("Failed to delete task");
      });
  };

  const onComplete = (id: number) => {
    axios
      .put(`http://localhost:8080/api/${id}/complete`)
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.error("Failed to mark task as completed:", error);
        setError("Failed to mark task as completed");
      });
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            dateTime={task.dateTime}
            daysUntilTerm={task.daysUntilTerm}
            priority={task.priority}
            completed={task.completed}
            onEdit={() => fetchTasks()}
            onDelete={() => onDelete(task.id)}
            onComplete={() => onComplete(task.id)}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
