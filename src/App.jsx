import { lazy } from 'solid-js';
import { Route, Routes } from 'solid-app-router';
import styles from './App.module.css';

const Home = lazy(() => import('./pages/index.jsx'));
const Basics = lazy(() => import('./pages/basics/index.jsx'));
const Trainer = lazy(() => import('./pages/trainer/index.jsx'));

function App() {
  return (
    <div class={styles.App}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basics" element={<Basics />} />
        <Route path="/trainer" element={<Trainer />} />
      </Routes>
    </div>
  );
}

export default App;
