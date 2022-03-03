import styles from './Checkmark.module.css';

function Checkmark(props) {
  return (
    <label class={styles.main}>
      {props.children}
      <input
        type="checkbox"
        onChange={props.onChange}
        checked={props.checked}
      />
      <span class={styles.checkbox} />
    </label>
  );
}

export default Checkmark;
