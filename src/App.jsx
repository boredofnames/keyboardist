import { createStore } from 'solid-js/store';
import Keyboard from './components/Keyboard/Keyboard';
import Typer from './components/Typer/Typer';
import styles from './App.module.css';

function App() {
  const [state, setState] = createStore({
    emulate: false,
    layout: 0,
  });

  const setEmulate = (bool) => {
    setState({ emulate: bool });
  };

  const setLayout = (layout) => {
    setState({ layout: layout });
  };

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <span class={styles.logo}>Keyboardist</span>
      </header>
      <Typer emulate={state.emulate} layout={state.layout} />
      <Keyboard
        emulate={state.emulate}
        setEmulate={setEmulate}
        layout={state.layout}
        setLayout={setLayout}
      />
    </div>
  );
}

export default App;
