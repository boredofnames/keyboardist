import styles from './Keyboard.module.css';

function Key(props) {
  return (
    <span
      class={styles.Key}
      classList={{ [styles.homekey]: props.homekey }}
      style={{
        'background-color': props.pressed
          ? 'var(--color-lighter)'
          : 'var(--color-dark)',
        width: props.long ? '192px' : '64px',
        height: props.long ? '50px' : '64px',
        color: props.pressed ? 'var(--color-dark)' : 'var(--color-lighter)',
      }}
    >
      {props.shift === true ? props.key.toUpperCase() : props.key}
      {props.pressed}
    </span>
  );
}

export default Key;
