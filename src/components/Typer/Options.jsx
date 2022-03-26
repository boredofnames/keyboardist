import styles from './Typer.module.css';

export default function Options(props) {
  return (
    <div class={styles.options}>
      <span class={styles.logo}>Keyboardist</span>
      <select
        onChange={(e) => {
          props.setState({ type: e.target.value });
          props.onGenChange(e);
        }}
      >
        <option value="letters">Letters</option>
        <option value="words">Words</option>
        <option value="symbols">Symbols</option>
        <option value="sentences">Sentences</option>
      </select>
      <Switch>
        <Match when={props.state.type === 'letters'}>
          <select ref={props.letterSetRef} onChange={props.onGenChange}>
            <option value="first">First Set</option>
            <option value="second">Second Set</option>
            <option value="third">Third Set</option>
            <option value="forth">Forth Set</option>
            <option value="fifth">Fifth Set</option>
            <option value="sixth">Sixth Set</option>
            <option value="seventh">Seventh Set</option>
          </select>
        </Match>
        <Match when={props.state.type === 'symbols'}>
          <select ref={props.symbolSetRef} onChange={props.onGenChange}>
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
            onChange={onGenChange}
          />
        </Match>
        <Match when={props.state.type === 'sentences'}>
          <select ref={props.sentenceRef} onChange={onGenChange}>
            <option value="pangrams">Pangrams</option>
            <option value="long">Long</option>
          </select>
        </Match>
      </Switch>
      <span class={styles.stats}>
        {' '}
        Progress: {props.state.progress}% | Accuracy:{' '}
        {isNaN(props.state.accuracy) ? 0 : props.state.accuracy}% | gWPM:
        {props.state.wpm.gross} | nWPM: {props.state.wpm.net}
      </span>
    </div>
  );
}
