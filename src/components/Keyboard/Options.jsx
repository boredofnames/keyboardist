import useRedux from '../../store/useRedux';
import reduxStore from '../../store/store';
import actions from '../../store/actions';
import storage from '../../js/storage';
import styles from './Keyboard.module.css';
import Checkmark from '../common/Checkmark/Checkmark';

function Options(props) {
  const LAYOUT = {
    QWERTY: 'qwerty',
    QUERTYLA: 'qwertyla',
    COLEMAK: 'colemak',
    COLEMAK_DH: 'colemakdh',
    WORKMAN: 'workman',
    DVORAK: 'dvorak',
  };
  const [store, { toggleEmulate, setLayout, setEmulateFrom }] = useRedux(
    reduxStore,
    actions
  );
  return (
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
      <Checkmark
        checked={false}
        onChange={(e) => props.setState('split', e.target.checked)}
      >
        Split
      </Checkmark>
      <Checkmark
        checked={false}
        onChange={(e) => props.setState('ortholinear', e.target.checked)}
      >
        Ortholinear
      </Checkmark>
      <Checkmark
        checked={store.emulate}
        onChange={(e) => {
          toggleEmulate(e.target.checked);
          storage.set('emulate', e.target.checked);
        }}
      >
        Emulate
      </Checkmark>
      <Show when={store.emulate === true}>
        From:{' '}
        <select
          value={store.emulateFrom}
          onChange={(e) => {
            setEmulateFrom(e.target.value);
            storage.set('emulatefrom', e.target.value);
            document.activeElement.blur();
          }}
        >
          <For each={Object.values(LAYOUT)}>
            {(layout) => <option value={layout}>{layout}</option>}
          </For>
        </select>
      </Show>
    </div>
  );
}

export default Options;
