import { createSignal } from 'solid-js';
import { randomBetween } from '../../js/utils';
import styles from './Typewriter.module.css';

export default function Typewriter(props) {
  const [text, setText] = createSignal('');
  let index = 0,
    typing = props.children.toString(),
    length = typing.length,
    delay = randomBetween(100, 500),
    interval;

  const type = () => {
    setText((t) => (t += typing[index]));
    index++;
    if (index === length) clearInterval(interval);
    else {
      delay = randomBetween(100, 500);
      clearInterval(interval);
      interval = setInterval(type, delay);
    }
  };

  interval = setInterval(type, delay);
  return (
    <>
      <span>{text}</span>
      <span class={styles.caret}>|</span>
    </>
  );
}
