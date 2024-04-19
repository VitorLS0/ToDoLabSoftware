import Header from "../components/Header";
import Task from "../task/Task";
import TaskList from "../task/TaskList";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <Task />
      <TaskList />
    </div>
  );
};

export default Home;
