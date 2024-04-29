import { SetStateAction, useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState("MEDIUM"); // Default to 'MEDIUM'
  const [status, setStatus] = useState("");
  const [daysUntilTerm, setDaysUntilTerm] = useState("");

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleTaskTypeChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setStatus(e.target.value);
  };

  const renderFormFields = () => {
    switch (status) {
      case "SPECIFIC_DATE":
        return (
          <div>
            <input
              type="date"
              placeholder="Task Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <input
              type="time"
              placeholder="Task Due Time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>
        );
      case "COUNTED_DAYS":
        return (
          <div>
            <input
              type="number"
              placeholder="Days Until Term"
              value={daysUntilTerm}
              onChange={(e) => setDaysUntilTerm(e.target.value)}
            />
          </div>
        );
      case "NO_ESTIMATED_TIME":
        return null;
      default:
        return null;
    }
  };

  const createTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dateTime = dueDate && dueTime ? `${dueDate}T${dueTime}` : undefined;

    fetch("http://localhost:8080/api/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        dateTime,
        priority,
        status,
        daysUntilTerm: Number(daysUntilTerm),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create task");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task created:", data);
        setShowForm(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  return (
    <header className={styles.header}>
      <button onClick={toggleForm}>Nova Tarefa</button>
      {showForm && (
        <form onSubmit={(e) => createTask(e)}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="HIGH">Alta</option>
            <option value="MEDIUM">Média</option>
            <option value="LOW">Baixa</option>
          </select>

          <select value={status} onChange={handleTaskTypeChange}>
            <option value="">Selecionar tipo de tarefa</option>
            <option value="NO_ESTIMATED_TIME">Sem prazo</option>
            <option value="SPECIFIC_DATE">Data específica</option>
            <option value="COUNTED_DAYS">Dias até o prazo</option>
          </select>

          {status && renderFormFields()}
          <button type="submit">Criar Tarefa</button>
        </form>
      )}
    </header>
  );
};

export default Header;
