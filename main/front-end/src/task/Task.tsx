// Task.js
import styles from './Task.module.css';

interface TaskProps {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({ title, description, dueDate, priority, onEdit, onDelete }) => {
  return (
    <div className={styles.task}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className={styles.taskDetails}>
        <div className={`${styles.priority} ${styles[priority.toLowerCase()]}`}>
          {priority}
        </div>
        <h4>Due Date: {dueDate}</h4>
      </div>

      <div className={styles.taskActions}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
