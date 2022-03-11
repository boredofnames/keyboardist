import styles from './Keyboard.module.css';

function Key(props) {
  return (
    <span
      class={styles.Key}
      classList={{
        [styles.homekey]: props.homekey,
        [styles.active]: props.active,
        [styles.pressed]: props.pressed,
        [styles.long]: props.long,
      }}
    >
      {props.key}
      {props.pressed}
    </span>
  );
}

export default Key;
