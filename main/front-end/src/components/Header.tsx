import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>My App</div>
      <button>New Task</button>
    </header>
  );
};

export default Header;
