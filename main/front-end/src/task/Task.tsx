import styles from "./Task.module.css";

interface TaskProps {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  daysUntilTerm: number;
  status: string;
  priority: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({
  title,
  description,
  dateTime,
  daysUntilTerm,
  priority,
  onEdit,
  onDelete,
}) => {
  const priorityColorClass = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return styles.priorityHigh;
      case "MEDIUM":
        return styles.priorityMedium;
      case "LOW":
        return styles.priorityLow;
      default:
        return styles.priorityDefault;
    }
  };

  let formattedDateTime = '';
  if (dateTime) {
    try {
      formattedDateTime = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(dateTime));
    } catch (error) {
      console.error('Invalid dateTime format:', dateTime, error);
      formattedDateTime = 'Invalid date'; // Or handle it in another appropriate way
    }
  }

  return (
    <div className={styles.task}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className={styles.taskDetails}>
        <div className={`${styles.priority} ${priorityColorClass(priority)}`}></div>
        <h4>Prazo: {formattedDateTime}</h4>
        <h5>- {daysUntilTerm} dias restantes</h5>
      </div>

      <div className={styles.taskActions}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
