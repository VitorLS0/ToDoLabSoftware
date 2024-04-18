import Header from "../components/Header";
import Task from "../task/Task";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <Task />
    </div>
  );
};

export default Home;
