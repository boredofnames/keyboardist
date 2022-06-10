import { createEffect, createMemo, onCleanup, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import useRedux from '../../store/useRedux';
import reduxStore from '../../store/store';
import actions from '../../store/actions';
import { filterObject } from '../../js/utils';
import Key from './Key';
import LAYOUTS from './layouts.json';
import Hand from './Hand';
import Options from './Options';
import styles from './Keyboard.module.css';

function Keyboard(props) {
  const [store, { setMapping }] = useRedux(reduxStore, actions);

  const buildMapping = (emulateFrom) => {
    let fromLayout = getLayout(LAYOUTS[emulateFrom]),
      toLayout = layout() || store.customLayout,
      mapping = {};

    for (let row in toLayout) {
      if (row === 'space') continue;
      for (let type in toLayout[row]) {
        for (let side in toLayout[row][type]) {
          for (
            let i = 0, len = toLayout[row][type][side].length;
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
    console.log(mapping);
    return mapping;
  };

  const [state, setState] = createStore({
    split: false,
    ortholinear: false,
    keys: {},
    layout: LAYOUTS[store.layout] || store.customLayout,
  });

  const onKeyDown = (e) => {
    //console.log(e.key, store.mapping[e.key]);
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

  createEffect(() => {
    setState({ layout: LAYOUTS[store.layout] || store.customLayout });
  });

  createEffect(() => {
    setMapping(buildMapping(store.emulateFrom));
    //console.log('built mapping');
  });

  onMount(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  });

  onCleanup(() => {
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
  });

  const getLayout = (from) =>
    store.standard === 'iso'
      ? { ...from['ansi'], ...from['iso'] }
      : from['ansi'];

  let layout = createMemo(() => getLayout(state.layout));

  return (
    <div class={styles.Keyboard} classList={{ [styles.fit]: props.minimal }}>
      <Show when={!props.minimal}>
        <Options setState={setState} />
      </Show>
      <div class={styles.container}>
        <Show when={!props.minimal}>
          <Hand side="left" />
        </Show>
        <div class={styles.keys}>
          <For each={Object.keys(layout())} fallback={<div>Loading..</div>}>
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
                      ? store.standard === 'ansi'
                        ? '42px'
                        : '-12px'
                      : !state.ortholinear && row === 'number'
                      ? '-82px'
                      : state.ortholinear && row === 'number'
                      ? '-54px'
                      : '0px',
                }}
              >
                <For
                  each={Object.keys(
                    layout()[row][state.keys['Shift'] ? 'caps' : 'main']
                  )}
                >
                  {(side) => (
                    <>
                      <For
                        each={layout()[row][
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
        <Show when={!props.minimal}>
          <Hand side="right" />
        </Show>
      </div>
    </div>
  );
}

export default Keyboard;
