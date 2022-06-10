import { onMount } from 'solid-js';
import styles from './Button.module.css';

export default function Button(props) {
  let ref = props.ref || undefined;

  const onKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    props.onClick && props.onClick();
  };

  onMount(() => {
    if (props.focus) ref.focus();
  });

  return (
    <div
      ref={ref}
      class={`${styles.button} ${props.class}`}
      style={props.style}
      onClick={props.onClick}
      onKeyDown={onKeyDown}
      tabIndex="0"
    >
      {props.children}
    </div>
  );
}
