import Keyboard from './components/Keyboard/Keyboard';
import Typer from './components/Typer/Typer';
import styles from './App.module.css';

function App() {
  return (
    <div class={styles.App}>
      <Typer />
      <Keyboard />
    </div>
  );
}

export default App;
