import { onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { filterObject } from '../../js/utils';
import Key from './Key';
import LAYOUTS from './layouts.json';
import MAPPING from './mapping.json';
import styles from './Keyboard.module.css';

function Keyboard(props) {
  const LAYOUT = {
    QWERTY: 0,
    COLEMAK: 1,
    COLEMAK_DH: 2,
    WORKMAN: 3,
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
        props.emulate && MAPPING[props.layout][e.key]
          ? MAPPING[props.layout][e.key]
          : e.key,
      newKeys = { ...state.keys, [key]: true };
    setState('keys', newKeys);
  };
  const onKeyUp = (e) => {
    let key =
        props.emulate && MAPPING[props.layout][e.key]
          ? MAPPING[props.layout][e.key]
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
            value={0}
            onChange={(e) => {
              props.setLayout(e.target.value);
              document.activeElement.blur();
            }}
          >
            <option value={LAYOUT.QWERTY}>qwerty</option>
            <option value={LAYOUT.COLEMAK}>colemak</option>
            <option value={LAYOUT.COLEMAK_DH}>colemak-dh</option>
            <option value={LAYOUT.WORKMAN}>workman</option>
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
            value={props.emulate}
            onChange={(e) => props.setEmulate(e.target.checked)}
          />
          <span class="checkbox"></span>
        </label>
      </div>

      <div class={styles.keys}>
        <For
          each={Object.keys(LAYOUTS[props.layout])}
          fallback={<div>Loading..</div>}
        >
          {(row) => (
            <div
              class={styles.row}
              style={{
                'margin-left':
                  !state.ortholinear && row === 'space'
                    ? '170px'
                    : state.ortholinear && row === 'space'
                    ? '144px'
                    : !state.ortholinear && row === 'mid'
                    ? '10px'
                    : !state.ortholinear && row === 'bottom'
                    ? '26px'
                    : '0px',
                //'align-self': row === 'space' ? 'center' : 'auto',
              }}
            >
              <For each={Object.keys(LAYOUTS[props.layout][row])}>
                {(side) => (
                  <>
                    <For each={LAYOUTS[props.layout][row][side].split('')}>
                      {(key, i) => (
                        <Key
                          key={getKey(key)}
                          pressed={state.keys[getKey(key)] === true}
                          homekey={
                            (row === 'mid' && side === 'left' && i() === 3) ||
                            (row === 'mid' && side === 'right' && i() === 1)
                          }
                          long={row === 'space'}
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
    </div>
  );
}

export default Keyboard;
