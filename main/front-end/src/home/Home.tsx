import Header from "../components/Header";
import TaskList from "../task/TaskList";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <TaskList />
    </div>
  );
};

export default Home;
