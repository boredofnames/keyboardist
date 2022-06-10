import styles from './Trainer.module.css';

export default function Options(props) {
  return (
    <div class={styles.options}>
      <select
        ref={props.categoryRef}
        onChange={(e) => {
          props.setState({ type: e.target.value });
          props.restart();
        }}
      >
        <option value="letters">Letters</option>
        <option value="words">Words</option>
        <option value="symbols">Symbols</option>
        <option value="sentences">Sentences</option>
      </select>
      <Switch>
        <Match when={props.state.type === 'letters'}>
          <select ref={props.letterSetRef} onChange={props.restart}>
            <option value="first">First Set</option>
            <option value="second">Second Set</option>
            <option value="third">Third Set</option>
            <option value="forth">Forth Set</option>
            <option value="fifth">Fifth Set</option>
            <option value="sixth">Sixth Set</option>
            <option value="seventh">Seventh Set</option>
            <option value="practice">Practice Set</option>
          </select>
        </Match>
        <Match when={props.state.type === 'symbols'}>
          <select ref={props.symbolSetRef} onChange={props.restart}>
            <option value="first">First Set</option>
            <option value="second">Second Set</option>
            <option value="third">Third Set</option>
            <option value="forth">Forth Set</option>
            <option value="fifth">Fifth Set</option>
            <option value="sixth">Sixth Set</option>
            <option value="seventh">Seventh Set</option>
            <option value="eighth">Eighth Set</option>
          </select>
        </Match>
        <Match when={props.state.type === 'words'}>
          Max Length:{' '}
          <input
            type="number"
            min="2"
            max="16"
            value="4"
            ref={props.wordMaxRef}
            onChange={props.restart}
          />
        </Match>
        <Match when={props.state.type === 'sentences'}>
          <select ref={props.sentenceRef} onChange={props.restart}>
            <option value="pangrams">Pangrams</option>
            <option value="long">Long</option>
          </select>
        </Match>
      </Switch>
    </div>
  );
}
