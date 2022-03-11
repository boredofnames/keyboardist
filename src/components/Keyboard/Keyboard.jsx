import { createEffect, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import useRedux from '../../store/useRedux';
import reduxStore from '../../store/store';
import actions from '../../store/actions';

import { filterObject } from '../../js/utils';
import Key from './Key';
import LAYOUTS from './layouts.json';

import styles from './Keyboard.module.css';

import Hand from './Hand';
import Options from './Options';

function Keyboard() {
  const [store, { setMapping }] = useRedux(reduxStore, actions);

  const buildMapping = (emulateFrom) => {
    let fromLayout = LAYOUTS[emulateFrom],
      toLayout = LAYOUTS[store.layout],
      mapping = {};

    for (let row in fromLayout) {
      if (row === 'space') continue;
      for (let type in fromLayout[row]) {
        for (let side in fromLayout[row][type]) {
          for (
            let i = 0, len = fromLayout[row][type][side].length;
            i < len;
            i++
          ) {
            let from = fromLayout[row][type][side][i],
              to = toLayout[row][type][side][i];
            if (!from || !to) continue;

            mapping[from] = to;
          }
        }
      }
    }
    return mapping;
  };

  const [state, setState] = createStore({
    split: false,
    ortholinear: false,
    keys: {},
  });

  const onKeyDown = (e) => {
    console.log(e.key);
    let key =
        store.emulate && store.mapping[e.key] ? store.mapping[e.key] : e.key,
      newKeys = { ...state.keys, [key]: true };
    setState('keys', newKeys);
  };
  const onKeyUp = (e) => {
    let key =
        store.emulate && store.mapping[e.key] ? store.mapping[e.key] : e.key,
      newKeys = { ...state.keys, [key]: false };
    setState({
      keys:
        e.key === 'Shift'
          ? filterObject(newKeys, (key, val) => !/^[A-Z{}|:"<>?]$/.test(key))
          : newKeys,
    });
  };

  onMount(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  });

  createEffect(() => {
    setMapping(buildMapping(store.emulateFrom));
    console.log('built mapping');
  });

  return (
    <div class={styles.Keyboard}>
      <Options setState={setState} />
      <div class={styles.container}>
        <Hand side="left" />
        <div class={styles.keys}>
          <For
            each={Object.keys(LAYOUTS[store.layout])}
            fallback={<div>Loading..</div>}
          >
            {(row) => (
              <div
                class={styles.row}
                style={{
                  'margin-left':
                    !state.ortholinear && row === 'space'
                      ? '116px'
                      : state.ortholinear && row === 'space'
                      ? '74px'
                      : !state.ortholinear && row === 'mid'
                      ? '10px'
                      : !state.ortholinear && row === 'bottom'
                      ? '42px'
                      : !state.ortholinear && row === 'number'
                      ? '-82px'
                      : state.ortholinear && row === 'number'
                      ? '-54px'
                      : '0px',
                }}
              >
                <For
                  each={Object.keys(
                    LAYOUTS[store.layout][row][
                      state.keys['Shift'] ? 'caps' : 'main'
                    ]
                  )}
                >
                  {(side) => (
                    <>
                      <For
                        each={LAYOUTS[store.layout][row][
                          state.keys['Shift'] ? 'caps' : 'main'
                        ][side].split('')}
                      >
                        {(key, i) => (
                          <Key
                            key={key}
                            pressed={state.keys[key] === true}
                            homekey={
                              (row === 'mid' && side === 'left' && i() === 3) ||
                              (row === 'mid' && side === 'right' && i() === 1)
                            }
                            long={row === 'space'}
                            active={key === store.letter}
                          />
                        )}
                      </For>
                      <Show when={side === 'left' && state.split}>
                        <div class={styles.spacer} />
                      </Show>
                    </>
                  )}
                </For>
              </div>
            )}
          </For>
        </div>
        <Hand side="right" />
      </div>
    </div>
  );
}

export default Keyboard;
