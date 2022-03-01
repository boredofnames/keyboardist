import { onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

import useRedux from '../../store/useRedux';
import reduxStore from '../../store/store';
import actions from '../../store/actions';

import { filterObject } from '../../js/utils';
import Key from './Key';
import LAYOUTS from './layouts.json';
import MAPPING from './mapping.json';
import styles from './Keyboard.module.css';

import Hand from './hand';
import storage from '../../js/storage';

function Keyboard() {
  const [store, { toggleEmulate, setLayout }] = useRedux(reduxStore, actions);

  const LAYOUT = {
    QWERTY: 'qwerty',
    COLEMAK: 'colemak',
    COLEMAK_DH: 'colemakdh',
    WORKMAN: 'workman',
  };

  const shifted = {
    '[': '{',
    ']': '}',
    '\\': '|',
    ';': ':',
    "'": '"',
    ',': '<',
    '.': '>',
    '/': '?',
  };

  const [state, setState] = createStore({
    split: false,
    ortholinear: false,
    keys: {},
  });

  const onKeyDown = (e) => {
    let key =
        store.emulate && MAPPING[store.layout][e.key]
          ? MAPPING[store.layout][e.key]
          : e.key,
      newKeys = { ...state.keys, [key]: true };
    setState('keys', newKeys);
  };
  const onKeyUp = (e) => {
    let key =
        store.emulate && MAPPING[store.layout][e.key]
          ? MAPPING[store.layout][e.key]
          : e.key,
      newKeys = { ...state.keys, [key]: false };
    setState({
      keys:
        e.key === 'Shift'
          ? filterObject(newKeys, (key, val) => !/^[A-Z{}|:"<>?]$/.test(key))
          : newKeys,
    });
  };

  const getKey = (key) => {
    if (!state.keys['Shift']) return key;
    let upper = key.toUpperCase();
    if (upper !== key) return upper;
    else return shifted[key];
  };

  onMount(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  });

  return (
    <div class={styles.Keyboard}>
      <div class={styles.options}>
        <label>
          Layout:{' '}
          <select
            value={store.layout}
            onChange={(e) => {
              setLayout(e.target.value);
              storage.set('layout', e.target.value);
              document.activeElement.blur();
            }}
          >
            <For each={Object.values(LAYOUT)}>
              {(layout) => <option value={layout}>{layout}</option>}
            </For>
          </select>{' '}
        </label>
        <label class="main">
          Split
          <input
            type="checkbox"
            onChange={(e) => setState('split', e.target.checked)}
          />
          <span class="checkbox"></span>
        </label>{' '}
        <label class="main">
          Ortholinear
          <input
            type="checkbox"
            onChange={(e) => setState('ortholinear', e.target.checked)}
          />
          <span class="checkbox"></span>
        </label>
        <label class="main">
          Emulate
          <input
            type="checkbox"
            checked={store.emulate}
            onChange={(e) => {
              toggleEmulate(e.target.checked);
              storage.set('emulate', e.target.checked);
            }}
          />
          <span class="checkbox"></span>
        </label>
      </div>
      <div class={styles.container}>
        <Hand side="left" letter={store.letter} />
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
                      ? '186px'
                      : state.ortholinear && row === 'space'
                      ? '144px'
                      : !state.ortholinear && row === 'mid'
                      ? '10px'
                      : !state.ortholinear && row === 'bottom'
                      ? '42px'
                      : '0px',
                  //'align-self': row === 'space' ? 'center' : 'auto',
                }}
              >
                <For each={Object.keys(LAYOUTS[store.layout][row])}>
                  {(side) => (
                    <>
                      <For each={LAYOUTS[store.layout][row][side].split('')}>
                        {(key, i) => (
                          <Key
                            key={getKey(key)}
                            pressed={state.keys[getKey(key)] === true}
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
        <Hand side="right" letter={store.letter} />
      </div>
    </div>
  );
}

export default Keyboard;
