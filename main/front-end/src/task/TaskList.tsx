// TaskList.js
import { useEffect, useState } from 'react';
import Task from './Task';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/viewList')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      })
      .then(data => setTasks(data))
      .catch(error => setError(error.message));
  }, []);

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Editing task with ID ${id}`);
  };

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log(`Deleting task with ID ${id}`);
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        tasks.map((task: { id: number, title: string, description: string, dueDate: string, priority: string }) => (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            priority={task.priority}
            onEdit={() => handleEdit(task.id)}
            onDelete={() => handleDelete(task.id)}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
