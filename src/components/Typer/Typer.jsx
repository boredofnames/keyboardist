import { createEffect, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import MAPPING from '../Keyboard/mapping.json';
import styles from './Typer.module.css';

function Typer(props) {
  const [state, setState] = createStore({
    type: 'letters',
    text: 'loading...',
    typed: [],
    progress: 0,
    accuracy: 0,
    wpm: { gross: 0, net: 0 },
    start: null,
  });

  const sets = {
    first: 'eari',
    second: 'otns',
    third: 'lcud',
    forth: 'pmhg',
    fifth: 'bfyw',
    sixth: 'kvx',
    seventh: 'zjq',
  };

  const sentences = {
    pangrams: [
      'Sphinx of black quartz, judge my vow',
      'Jackdaws love my big sphinx of quartz',
      'Pack my box with five dozen liquor jugs',
      'The quick onyx goblin jumps over the lazy dwarf',
      'Cwm fjord bank glyphs vext quiz',
      'How razorback-jumping frogs can level six piqued gymnasts!',
      'Cozy lummox gives smart squid who asks for job pen',
      'Amazingly few discotheques provide jukeboxes',
      "Now fax quiz Jack!' my brave ghost pled",
      "Watch Jeopardy!, Alex Trebek's fun TV quiz game.",
    ],
    long: [
      'As he crossed toward the pharmacy at the corner he involuntarily turned his head because of a burst of light that had ricocheted from his temple, and saw, with that quick smile with which we greet a rainbow or a rose, a blindingly white parallelogram of sky being unloaded from the van—a dresser with mirrors across which, as across a cinema screen, passed a flawlessly clear reflection of boughs sliding and swaying not arboreally, but with a human vacillation, produced by the nature of those who were carrying this sky, these boughs, this gliding facade.',
      'On offering to help the blind man, the man who then stole his car, had not, at that precise moment, had any evil intention, quite the contrary, what he did was nothing more than obey those feelings of generosity and altruism which, as everyone knows, are the two best traits of human nature and to be found in much more hardened criminals than this one, a simple car-thief without any hope of advancing in his profession, exploited by the real owners of this enterprise, for it is they who take advantage of the needs of the poor.',
      'My very photogenic mother died in a freak accident (picnic, lightning) when I was three, and, save for a pocket of warmth in the darkest past, nothing of her subsists within the hollows and dells of memory, over which, if you can still stand my style (I am writing under observation), the sun of my infancy had set: surely, you all know those redolent remnants of day suspended, with the midges, about some hedge in bloom or suddenly entered and traversed by the rambler, at the bottom of a hill, in the summer dusk; a furry warmth, golden midges.',
      'The French are certainly misunderstood: — but whether the fault is theirs, in not sufficiently explaining themselves, or speaking with that exact limitation and precision which one would expect on a point of such importance, and which, moreover, is so likely to be contested by us — or whether the fault may not be altogether on our side, in not understanding their language always so critically as to know "what they would be at" — I shall not decide; but \'tis evident to me, when they affirm, "That they who have seen Paris, have seen every thing," they must mean to speak of those who have seen it by day-light.',
      'In the loveliest town of all, where the houses were white and high and the elms trees were green and higher than the houses, where the front yards were wide and pleasant and the back yards were bushy and worth finding out about, where the streets sloped down to the stream and the stream flowed quietly under the bridge, where the lawns ended in orchards and the orchards ended in fields and the fields ended in pastures and the pastures climbed the hill and disappeared over the top toward the wonderful wide sky, in this loveliest of all towns Stuart stopped to get a drink of sarsaparilla.',
      'All I know is that I stood spellbound in his high-ceilinged studio room, with its north-facing windows in front of the heavy mahogany bureau at which Michael said he no longer worked because the room was so cold, even in midsummer; and that, while we talked of the difficulty of heating old houses, a strange feeling came upon me, as if it were not he who had abandoned that place of work but I, as if the spectacles cases, letters and writing materials that had evidently lain untouched for months in the soft north light had once been my spectacle cases, my letters and my writing materials.',
      "But it was the figure you cut as an employee, on an employee's footing with the girls, in work clothes, and being of that tin-tough, creaking, jazzy bazaar of hardware, glassware, chocolate, chicken-feed, jewelry, drygoods, oilcloth, and song hits—that was the big thing; and even being the Atlases of it, under the floor, hearing how the floor bore up under the ambling weight of hundreds, with the fanning, breathing movie organ next door and the rumble descending from the trolleys on Chicago Avenue—the bloody-rinded Saturday gloom of wind-borne ash, and blackened forms of five-storey buildings rising up to a blind Northern dimness from the Christmas blaze of shops.",
      "She's too young, it's too late, we come apart, my arms are held, and the edges go dark and nothing is left but a little window, a very little window, like the wrong end of a telescope, like the window on a Christmas card, an old one, night and ice outside, and within a candle, a shining tree, a family, I can hear the bells even, sleigh bells, from the radio, old music, but through this window I can see, small but very clear, I can see her, going away from me, through the trees which are already turning, red and yellow, holding out her arms to me, being carried away.",
      'It was not to them (not to Hugh, or Richard, or even to devoted Miss Brush) the liberator of the pent egotism, which is a strong martial woman, well nourished, well descended, of direct impulses, downright feelings, and little introspective power (broad and simple-why could not every one be broad and simple? she asked) feels rise within her, once youth is past, and must eject upon some object-it may be Emigration, it may be Emancipation; but whatever it be, this object round which the essence of her soul is daily secreted, becomes inevitably prismatic, lustrous, half looking glass, half precious stone; now carefully hidden in case people should sneer at it; now proudly displayed.',
      "The streets are paved now, and the telephone and electric companies are cutting down more and more of the shade trees-the water oaks, the maples and locusts and elms-to make room for iron poles bearing clusters of bloated and ghostly and bloodless grapes, and we have a city laundry which makes the rounds on Monday morning, gathering the bundles of clothes into bright-colored, specially-made motor cars: the soiled wearing of a whole week now flees apparitionlike behind alert and irritable electric horns, with a long diminishing noise of rubber and asphalt like tearing silk, and even the Negro women who still take in white people's washing after the old custom, fetch and deliver it in automobiles.",
      'Her plan for the morning thus settled, she sat quietly down to her book after breakfast, resolving to remain in the same place and the same employment till the clock struck one; and from habitude very little incommoded by the remarks and ejaculations of Mrs. Allen, whose vacancy of mind and incapacity for thinking were such, that as she never talked a great deal, so she could never be entirely silent; and, therefore, while she sat at her work, if she lost her needle or broke her thread, if she heard a carriage in the street, or saw a speck upon her gown, she must observe it aloud, whether there were anyone at leisure to answer her or not.',
      "She had said I'm tired of begging God to overthrow my son, because all this business of living in the presidential palace is like having the lights on all the time, sir, and she had said it with the same naturalness with which on one national holiday she had made her way through the guard of honor with a basket of empty bottles and reached the presidential limousine that was leading the parade of celebration in an uproar of ovations and martial music and storms of flowers and she shoved the basket through the window and shouted to her son that since you'll be passing right by take advantage and return these bottles to the store on the corner, poor mother.",
      "I liked to sit up front and ride the fast ones all day long, I liked it when they brushed right up against the buildings north of the Loop and I especially liked it when the buildings dropped away into that bombed-out squalor a little farther north in which people (through windows you'd see a person in his dirty naked kitchen spooning soup toward his face, or twelve children on their bellies on the floor, watching television, but instantly they were gone, wiped away by a movie billboard of a woman winking and touching her upper lip deftly with her tongue, and she in turn erased by a—wham, the noise and dark dropped down around your head—tunnel) actually lived.",
    ],
  };

  let setRef, sentenceRef;

  const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generate = () => {
    let generated = [];
    if (state.type === 'letters') {
      let set = sets[setRef.value].split('');
      while (generated.length < 100) generated.push(randomFrom(set));
      return generated.join('');
    } else return randomFrom(sentences[sentenceRef.value]);
  };

  const onKeyDown = (e) => {
    if (state.start === null) setState('start', Date.now());
    let allowed = ['Backspace'],
      key =
        props.emulate && MAPPING[props.layout][e.key]
          ? MAPPING[props.layout][e.key]
          : e.key;
    if (!allowed.includes(key) && !/^[a-zA-Z '".,-?!]$/.test(key)) return;
    if (key === 'Backspace') setState('typed', (t) => t.slice(0, t.length - 1));
    else setState('typed', (t) => [...t, key]);

    if (state.typed.length >= state.text.length)
      setTimeout(
        () => setState({ typed: [], text: generate(), start: null }),
        2000
      );
  };

  onMount(() => {
    document.addEventListener('keydown', onKeyDown);
    setState('text', generate());
  });

  const getAccuracy = () => {
    let typed = state.typed.length,
      correct = 0;
    for (let i = 0, len = typed; i < len; i++) {
      if (state.typed[i] === state.text[i]) correct++;
    }
    return Math.round((correct / typed) * 100);
  };

  const getWPM = () => {
    let typedCount = state.typed.length,
      incorrect = 0,
      elapsed = (Date.now() - state.start) / 1000 / 60;

    for (let i = 0, len = typedCount; i < len; i++) {
      if (state.typed[i] !== state.text[i]) incorrect++;
    }

    // console.log(
    //   'elapsed',
    //   elapsed,
    //   'typedCount',
    //   typedCount,
    //   'incorrect',
    //   incorrect
    // );

    let gross = Math.round(typedCount / 5 / elapsed),
      net = Math.round(gross - incorrect / elapsed);

    //console.log('gross', gross, 'net', net);

    return { gross, net };
  };

  createEffect(() => {
    let progress = Math.round((state.typed.length / state.text.length) * 100),
      accuracy = getAccuracy(),
      wpm = getWPM();
    getAccuracy();
    setState({
      progress,
      accuracy,
      wpm,
    });
  });

  return (
    <div class={styles.Typer}>
      <div class={styles.options}>
        <select
          onChange={(e) => {
            setState({ type: e.target.value, typed: [], start: null });
            setState({ text: generate() });
            document.activeElement.blur();
          }}
        >
          <option value="letters">Letters</option>
          <option value="sentences">Sentences</option>
        </select>
        <Show when={state.type === 'letters'}>
          <select
            ref={setRef}
            onChange={() => {
              setState({ text: generate(), typed: [], start: null });
              document.activeElement.blur();
            }}
          >
            <option value="first">First Set</option>
            <option value="second">Second Set</option>
            <option value="third">Third Set</option>
            <option value="forth">Forth Set</option>
            <option value="fifth">Fifth Set</option>
            <option value="sixth">Sixth Set</option>
            <option value="seventh">Seventh Set</option>
          </select>
        </Show>
        <Show when={state.type === 'sentences'}>
          <select
            ref={sentenceRef}
            onChange={() => {
              setState({ text: generate(), typed: [], start: null });
              document.activeElement.blur();
            }}
          >
            <option value="pangrams">Pangrams</option>
            <option value="long">Long</option>
          </select>
        </Show>
        <span class={styles.stats}>
          {' '}
          Progress: {state.progress}% | Accuracy:{' '}
          {isNaN(state.accuracy) ? 0 : state.accuracy}% | gWPM:
          {state.wpm.gross} | nWPM: {state.wpm.net}
        </span>
      </div>
      <div class={styles.text}>
        <For each={state.text.split('')}>
          {(letter, i) => (
            <span
              class={styles.letter}
              style={{
                color: !state.typed[i()]
                  ? 'var(--color-lighter)'
                  : state.typed[i()] === letter
                  ? 'var(--color-light)'
                  : 'red',
              }}
            >
              {letter === ' ' ? '_' : letter}
            </span>
          )}
        </For>
      </div>
    </div>
  );
}

export default Typer;
