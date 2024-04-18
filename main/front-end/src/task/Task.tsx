import styles from "./Task.module.css";

const Task = () => {
  return (
    <div className={styles.task}>
      <div>
        <h2>Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi,
          dolores fugiat! Placeat ea id excepturi voluptatum beatae non
          repudiandae quisquam!
        </p>
      </div>

      <div className={styles.taskDetails}>
        <div className={styles.priority}></div>
        <h4>Due Date: 23/05/24</h4>
      </div>

      <div className={styles.taskActions}>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Task;
