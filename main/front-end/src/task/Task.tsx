import React, { useState } from "react";
import axios from "axios";
import styles from "./Task.module.css";

interface TaskProps {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  daysUntilTerm: number;
  priority: string;
  completed: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  dateTime,
  daysUntilTerm,
  priority,
  completed,
  onEdit,
  onDelete,
  onComplete,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

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

  let formattedDateTime = "";
  if (dateTime) {
    try {
      formattedDateTime = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(dateTime));
    } catch (error) {
      console.error("Invalid dateTime format:", dateTime, error);
      formattedDateTime = "Invalid date";
    }
  }

  const handleEdit = () => {
    setEditing(true);
    onEdit();
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  const handleSaveEdit = () => {
    axios
      .put(`http://localhost:8080/api/editById/${id}`, {
        title: editedTitle,
        description: editedDescription,
        dateTime: dateTime,
        daysUntilTerm: daysUntilTerm,
        priority: priority,
        completed: completed,
      })
      .then(() => {
        setEditing(false);
        onEdit();
      })
      .catch((error) => {
        console.error("Failed to edit task:", error);
      });
  };

  return (
    <div className={`${styles.task} ${completed ? styles.completed : ""}`}>
      {editing ? (
        <div className={styles.editForm}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <div>
            <button onClick={handleSaveEdit}>Salvar</button>
            <button onClick={handleCancelEdit}>Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          <div className={styles.taskDetails}>
            <div
              className={`${styles.priority} ${priorityColorClass(priority)}`}
            ></div>
            <h4>Prazo: {formattedDateTime}</h4>
            <h5>- {daysUntilTerm} dias restantes</h5>
          </div>

          <div className={styles.taskActions}>
            {completed ? (
              <>
                <button className={styles.completeBtn} disabled>Concluído</button>
                <button className={styles.deleteBtn} onClick={onDelete}>Deletar</button>
              </>
            ) : (
              <>
                {!completed && (
                  <button
                    className={styles.completeBtn}
                    onClick={onComplete}
                  >
                    Concluir Tarefa
                  </button>
                )}
                <button onClick={handleEdit}>Editar</button>
                <button className={styles.deleteBtn} onClick={onDelete}>Deletar</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
