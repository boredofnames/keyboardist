import { NavLink } from 'solid-app-router';
import styles from './Nav.module.css';

export default function Nav(props) {
  return (
    <div class={styles.Nav}>
      <NavLink class={styles.logo} href="/">
        Keyboardist
      </NavLink>
      {props.children}
      <div class="flex-spacer" />
      {/* <NavLink href="/basics">Basics</NavLink> */}
      <NavLink href="/trainer">Training</NavLink>
    </div>
  );
}
