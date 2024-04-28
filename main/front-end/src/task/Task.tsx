import React, { useState } from "react";
import axios from "axios";
import styles from "./Task.module.css";
import DeleteIcon from "../components/DeleteIcon";

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
            <div className={styles.taskTop}>
              <h2>{title}</h2>
              <div className={styles.flexRow}>
                <div
                  className={`${styles.priority} ${priorityColorClass(
                    priority
                  )}`}
                ></div>
                {!completed && (
                  <button className={styles.completeBtn} onClick={onComplete}>
                    Concluir
                  </button>
                )}
              </div>
            </div>
            <p>{description}</p>
          </div>

          <div className={styles.taskActions}>
            {completed ? (
              <>
                <div className={styles.flexRow2}>
                  <div className={styles.taskDetails}>
                    <button className={styles.deleteBtn} onClick={onDelete}>
                      <DeleteIcon />
                    </button>
                    <button className={styles.completeBtn} disabled>
                      Concluído
                    </button>
                  </div>
                  <div className={styles.taskDetails}>
                    <h4>Prazo: {formattedDateTime}</h4>
                    <h5>- {daysUntilTerm} dias restantes</h5>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.flexRow2}>
                  <div className={styles.taskDetails}>
                    <button className={styles.deleteBtn} onClick={onDelete}>
                      <DeleteIcon />
                    </button>
                    <button onClick={handleEdit}>Editar</button>
                  </div>

                  <div className={styles.taskDetails}>
                    <h4>Prazo: {formattedDateTime}</h4>
                    <h5>- {daysUntilTerm} dias restantes</h5>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
