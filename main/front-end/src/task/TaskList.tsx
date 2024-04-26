// TaskList.tsx
import React, { useEffect, useState } from 'react';
import Task from "./Task";
import axios from 'axios'; // Import axios for making HTTP requests

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [error, setError] = useState<string | null>(null);

  interface TaskData {
    id: number;
    title: string;
    description: string;
    dateTime: string;
    daysUntilTerm: number;
    status: string;
    priority: string;
  }  

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("http://localhost:8080/api/listAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return response.json();
      })
      .then((data: TaskData[]) => {
        setTasks(data);
      })
      .catch((error: Error) => setError(error.message));
  };

  const onDelete = (id: number) => {
    axios.delete(`http://localhost:8080/api/deleteById/${id}`)
      .then(() => {
        fetchTasks(); // Fetch tasks again after deletion
      })
      .catch((error: any) => {
        console.error('Failed to delete task:', error);
        setError('Failed to delete task');
      });
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        tasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            dateTime={task.dateTime}
            daysUntilTerm={task.daysUntilTerm}
            status={task.status}
            priority={task.priority}
            onEdit={() => console.log(`Editing task ${task.id}`)}
            onDelete={() => onDelete(task.id)}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
