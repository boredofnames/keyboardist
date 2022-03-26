import useRedux from '../../store/useRedux';
import reduxStore from '../../store/store';
import actions from '../../store/actions';
import storage from '../../js/storage';
import styles from './Keyboard.module.css';
import Checkmark from '../common/Checkmark/Checkmark';
import { createSignal } from 'solid-js';

function Options(props) {
  const [store, { toggleEmulate, setLayout, setEmulateFrom, setCustomLayout }] =
    useRedux(reduxStore, actions);

  const [showCustom, setShowCustom] = createSignal(false);

  const setCustom = (e) => {
    try {
      setCustomLayout(JSON.parse(e.target.value));
      storage.set('customLayout', e.target.value);
    } catch (error) {
      console.error(error);
    }
  };

  const edit = () => {
    setShowCustom(!showCustom());
  };

  const onLoad = (e) => {
    let layout = JSON.parse(e.target.result);
    setCustomLayout(layout);
    storage.set('customLayout', layout);
    loadFileRef.value = '';
  };

  const load = () => {
    var file = loadFileRef.files[0];
    var reader = new FileReader();
    reader.onloadend = (e) => onLoad(e);
    reader.readAsText(file);
  };

  const save = (e) => {
    let name = prompt('File name?', 'custom');
    if (!name) return;
    e.currentTarget.href = URL.createObjectURL(
      new Blob([JSON.stringify(store.customLayout)])
    );
    e.currentTarget.download = `${name}.kblo`;
  };

  let loadFileRef;

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
          <For each={props.layouts}>
            {(layout) => <option value={layout}>{layout}</option>}
          </For>
          <option value="custom">custom</option>
        </select>{' '}
      </label>
      <Show when={store.layout === 'custom'}>
        <span class={styles.button} onClick={edit}>
          Edit
        </span>{' '}
        <Show when={showCustom()}>
          <textarea
            value={JSON.stringify(store.customLayout, null, 2)}
            onChange={setCustom}
            spellCheck="false"
          />
        </Show>
        <label id="importlabel" onClick={(e) => e.stopPropagation()}>
          Load
          <input
            type="file"
            ref={loadFileRef}
            onChange={load}
            style={{ display: 'none' }}
          />
        </label>{' '}
        <label id="exportlabel" onClick={(e) => e.stopPropagation()}>
          <a classname="export" onClick={save}>
            Save
          </a>
        </label>{' '}
      </Show>
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
          <For each={props.layouts}>
            {(layout) => <option value={layout}>{layout}</option>}
          </For>
        </select>
      </Show>
    </div>
  );
}

export default Options;
