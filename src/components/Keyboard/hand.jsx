import useRedux from '../../store/useRedux';
import reduxStore from '../../store/store';
import actions from '../../store/actions';
import styles from './Keyboard.module.css';
import HandImg from '../../assets/fingers.png';
import layouts from './layouts.json';
import { createEffect, createSignal } from 'solid-js';

function Hand(props) {
  const [store] = useRedux(reduxStore, actions);
  const [keys, setKeys] = createSignal({});

  const indicators = {
    left: [
      {
        ids: [0],
        name: 'pinky',
        bottom: 82,
        left: 0,
      },
      {
        ids: [1],
        name: 'ring',
        bottom: 150,
        left: 58,
      },
      {
        ids: [2],
        name: 'middle',
        bottom: 165,
        left: 135,
      },
      {
        ids: [3, 4],
        name: 'index',
        bottom: 130,
        left: 222,
      },
    ],
    right: [
      {
        ids: [4, 5],
        name: 'pinky',
        bottom: 82,
        left: 222,
      },
      {
        ids: [3],
        name: 'ring',
        bottom: 150,
        left: 165,
      },
      {
        ids: [2],
        name: 'middle',
        bottom: 165,
        left: 88,
      },
      {
        ids: [0, 1],
        name: 'index',
        bottom: 130,
        left: 0,
      },
    ],
  };

  const genKeys = (layout) => {
    let k = {};
    let lo = store.layout === 'custom' ? store.customLayout : layouts[layout];
    Object.keys(lo).map((row) =>
      Object.keys(lo[row]).map((type) =>
        lo[row][type][props.side].split('').map((key, i) => {
          if (key === ' ') return;
          else if (row === 'number' && i > 0) k[key] = i - 1;
          else k[key] = i;
        })
      )
    );
    return k;
  };

  createEffect(() => setKeys(genKeys(store.layout)));

  const isActive = (finger) => finger.ids.includes(keys()[store.letter]);

  return (
    <div class={styles.hand}>
      <img
        src={HandImg}
        alt={`${props.side}-hand`}
        class={styles[`${props.side}hand`]}
      />
      <For each={indicators[props.side]}>
        {(finger) => (
          <div
            class={styles.indicator}
            classList={{
              [styles.active]: isActive(finger),
            }}
            style={{
              bottom: `${finger.bottom}px`,
              left: `${finger.left}px`,
            }}
          >
            <Show when={isActive(finger)}>{store.letter}</Show>
          </div>
        )}
      </For>
    </div>
  );
}

export default Hand;
