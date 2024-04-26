import { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState('MEDIUM'); // Default to 'MEDIUM'
  const [status, setStatus] = useState('');
  const [daysUntilTerm, setDaysUntilTerm] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const createTask = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    // Check if date or time is empty and alert the user
    if (!dueDate || !dueTime) {
      alert("Please fill in both the date and time fields.");
      return;
    }
  
    const dateTime = `${dueDate}T${dueTime}`;
  
    fetch('http://localhost:8080/api/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        dateTime,
        priority,
        status,
        daysUntilTerm: Number(daysUntilTerm)
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      return response.json();
    })
    .then(data => {
      console.log('Task created:', data);
      // Optionally reset form or give user feedback
      setShowForm(false); // Close the form on successful submission
    })
    .catch(error => {
      console.error('Error creating task:', error);
    });
  };
  

  return (
    <header className={styles.header}>
      <button onClick={toggleForm}>New Task</button>
      {showForm && (
        <form onSubmit={createTask}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="date"
            placeholder="Task Due Date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
          <input
            type="time"
            placeholder="Task Due Time"
            value={dueTime}
            onChange={e => setDueTime(e.target.value)}
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={e => setStatus(e.target.value)}
          />
          <input
            type="number"
            placeholder="Days Until Term"
            value={daysUntilTerm}
            onChange={e => setDaysUntilTerm(e.target.value)}
          />
          <button type="submit">Create Task</button>
        </form>
      )}
    </header>
  );
};

export default Header;
