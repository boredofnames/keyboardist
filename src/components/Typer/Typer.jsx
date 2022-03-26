import { createEffect, Match, onMount, Switch } from 'solid-js';
import { createStore } from 'solid-js/store';
import useRedux from '../../store/useRedux';
import reduxStore from '../../store/store';
import actions from '../../store/actions';
import Options from './Options';
import randomWords from 'random-words';
import { randomFrom } from '../../js/utils';
import styles from './Typer.module.css';

function Typer() {
  const [store, { setNextLetter }] = useRedux(reduxStore, actions);

  const [state, setState] = createStore({
    type: 'letters',
    text: 'loading...',
    typed: [],
    progress: 0,
    accuracy: 0,
    wpm: { gross: 0, net: 0 },
    start: null,
    locked: false,
    errors: {},
  });

  const letterSets = {
    first: 'eari',
    second: 'otns',
    third: 'lcud',
    forth: 'pmhg',
    fifth: 'bfyw',
    sixth: 'kvx',
    seventh: 'zjq',
  };

  const symbolSets = {
    first: ',.?!',
    second: '"\'/\\',
    third: ';:@$',
    forth: '<>#=',
    fifth: '[]%^',
    sixth: '`~{}',
    seventh: '&*()',
    eighth: '_+|-',
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
      'Waltz, bad nymph, for quick jigs vex.',
      'Quick zephyrs blow, vexing daft Jim.',
      'Two driven jocks help fax my big quiz.',
      'Five quacking zephyrs jolt my wax bed.',
      'The five boxing wizards jump quickly.',
      'Pack my box with five dozen liquor jugs.',
      'The quick brown fox jumps over the lazy dog.',
      'Jinxed wizards pluck ivy from the big quilt.',
      'Crazy Fredrick bought many very exquisite opal jewels.',
      'We promptly judged antique ivory buckles for the next prize.',
      'A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent.',
      'Jaded zombies acted quaintly but kept driving their oxen forward.',
      'The job requires extra pluck and zeal from every young wage earner.',
    ],
    long: [
      'As he crossed toward the pharmacy at the corner he involuntarily turned his head because of a burst of light that had ricocheted from his temple, and saw, with that quick smile with which we greet a rainbow or a rose, a blindingly white parallelogram of sky being unloaded from the van-a dresser with mirrors across which, as across a cinema screen, passed a flawlessly clear reflection of boughs sliding and swaying not arboreally, but with a human vacillation, produced by the nature of those who were carrying this sky, these boughs, this gliding facade.',
      'On offering to help the blind man, the man who then stole his car, had not, at that precise moment, had any evil intention, quite the contrary, what he did was nothing more than obey those feelings of generosity and altruism which, as everyone knows, are the two best traits of human nature and to be found in much more hardened criminals than this one, a simple car-thief without any hope of advancing in his profession, exploited by the real owners of this enterprise, for it is they who take advantage of the needs of the poor.',
      'My very photogenic mother died in a freak accident (picnic, lightning) when I was three, and, save for a pocket of warmth in the darkest past, nothing of her subsists within the hollows and dells of memory, over which, if you can still stand my style (I am writing under observation), the sun of my infancy had set: surely, you all know those redolent remnants of day suspended, with the midges, about some hedge in bloom or suddenly entered and traversed by the rambler, at the bottom of a hill, in the summer dusk; a furry warmth, golden midges.',
      'The French are certainly misunderstood: - but whether the fault is theirs, in not sufficiently explaining themselves, or speaking with that exact limitation and precision which one would expect on a point of such importance, and which, moreover, is so likely to be contested by us - or whether the fault may not be altogether on our side, in not understanding their language always so critically as to know "what they would be at" - I shall not decide; but \'tis evident to me, when they affirm, "That they who have seen Paris, have seen every thing," they must mean to speak of those who have seen it by day-light.',
      'In the loveliest town of all, where the houses were white and high and the elms trees were green and higher than the houses, where the front yards were wide and pleasant and the back yards were bushy and worth finding out about, where the streets sloped down to the stream and the stream flowed quietly under the bridge, where the lawns ended in orchards and the orchards ended in fields and the fields ended in pastures and the pastures climbed the hill and disappeared over the top toward the wonderful wide sky, in this loveliest of all towns Stuart stopped to get a drink of sarsaparilla.',
      'All I know is that I stood spellbound in his high-ceilinged studio room, with its north-facing windows in front of the heavy mahogany bureau at which Michael said he no longer worked because the room was so cold, even in midsummer; and that, while we talked of the difficulty of heating old houses, a strange feeling came upon me, as if it were not he who had abandoned that place of work but I, as if the spectacles cases, letters and writing materials that had evidently lain untouched for months in the soft north light had once been my spectacle cases, my letters and my writing materials.',
      "But it was the figure you cut as an employee, on an employee's footing with the girls, in work clothes, and being of that tin-tough, creaking, jazzy bazaar of hardware, glassware, chocolate, chicken-feed, jewelry, drygoods, oilcloth, and song hits-that was the big thing; and even being the Atlases of it, under the floor, hearing how the floor bore up under the ambling weight of hundreds, with the fanning, breathing movie organ next door and the rumble descending from the trolleys on Chicago Avenue-the bloody-rinded Saturday gloom of wind-borne ash, and blackened forms of five-storey buildings rising up to a blind Northern dimness from the Christmas blaze of shops.",
      'It was not to them (not to Hugh, or Richard, or even to devoted Miss Brush) the liberator of the pent egotism, which is a strong martial woman, well nourished, well descended, of direct impulses, downright feelings, and little introspective power (broad and simple-why could not every one be broad and simple? she asked) feels rise within her, once youth is past, and must eject upon some object-it may be Emigration, it may be Emancipation; but whatever it be, this object round which the essence of her soul is daily secreted, becomes inevitably prismatic, lustrous, half looking glass, half precious stone; now carefully hidden in case people should sneer at it; now proudly displayed.',
      "The streets are paved now, and the telephone and electric companies are cutting down more and more of the shade trees-the water oaks, the maples and locusts and elms-to make room for iron poles bearing clusters of bloated and ghostly and bloodless grapes, and we have a city laundry which makes the rounds on Monday morning, gathering the bundles of clothes into bright-colored, specially-made motor cars: the soiled wearing of a whole week now flees apparitionlike behind alert and irritable electric horns, with a long diminishing noise of rubber and asphalt like tearing silk, and even the Negro women who still take in white people's washing after the old custom, fetch and deliver it in automobiles.",
      "She had said I'm tired of begging God to overthrow my son, because all this business of living in the presidential palace is like having the lights on all the time, sir, and she had said it with the same naturalness with which on one national holiday she had made her way through the guard of honor with a basket of empty bottles and reached the presidential limousine that was leading the parade of celebration in an uproar of ovations and martial music and storms of flowers and she shoved the basket through the window and shouted to her son that since you'll be passing right by take advantage and return these bottles to the store on the corner, poor mother.",
      "I liked to sit up front and ride the fast ones all day long, I liked it when they brushed right up against the buildings north of the Loop and I especially liked it when the buildings dropped away into that bombed-out squalor a little farther north in which people (through windows you'd see a person in his dirty naked kitchen spooning soup toward his face, or twelve children on their bellies on the floor, watching television, but instantly they were gone, wiped away by a movie billboard of a woman winking and touching her upper lip deftly with her tongue, and she in turn erased by a-wham, the noise and dark dropped down around your head-tunnel) actually lived.",
      "From a little after two o'clock until almost sundown of the long still hot weary dead September afternoon they sat in what Miss Coldfield still called the office because her father had called it that-a dim hot airless room with the blinds all closed and fastened for forty-three summers because when she was a girl someone had believed that light and moving air carried heat and that dark was always cooler, and which (as the sun shone fuller and fuller on that side of the house) became latticed with yellow slashes full of dust motes which Qunetin thought of as being flecks of the dead old dried paint itself blown inward from the scaling blinds as wind might have blown them.",
      'It is true that Alexei Alexandrovich vaguely sensed the levity and erroneousness of this notion of his faith, and he knew that when, without any thought that his forgiveness was the effect of a higher power, he had given himself to his spontaneous feeling, he had experienced greater happiness than when he thought every minute, as he did now, that Christ lived in his soul, and that by signing papers he was fulfilling His will, but it was necessary for him to think that way, it was so necessary for him in his humiliation to possess at least an invented loftiness from which he, despised by everyone, could despise others, that he clung to his imaginary salvation as if it were salvation indeed.',
      'And this Fyodor Pavlovich began to exploit; that is, he fobbed him off with small sums, with short-term handouts, until, after four years, Mitya, having run out of patience, came to our town a second time to finish his affairs with his parent, when it suddenly turned out, to his great amazement, that he already had precisely nothing, that it was impossible even to get an accounting, that he had already received the whole value of his property in cash from Fyodor Pavlovich and might even be in debt to him, that in terms of such and such deals that he himself had freely entered into on such and such dates, he had no right to demand anything more, and so on and so forth.',
      "We were two men in love with the same woman; he was in front of me and completely unaware of my presence as we walked through the turning and twisting streets of Istanbul, climbing and descending, we traveled like brethren through deserted streets given over to battling packs of stray dogs, passed burnt ruins where jinns loitered, mosque courtyards where angels reclined on domes to sleep, beside cypress trees murmuring to the souls of the dead, beyond the edges of snow-covered cemeteries crowded with ghosts, just out of sight of brigands strangling their victims, passed endless shops, stables, dervish houses, candle works, leather works and stone walls; and as we made ground, I felt I wasn't following him at all, but rather, that I was imitating him.",
      "Sometimes, though, there is a ghostly rumble among the drums, an asthmatic whisper in the trombones that swings me back into the early twenties when we drank wood alcohol and every day in every way grew better and better, and there was a first abortive shortening of the skirts, and girls all looked alike in sweater dresses, and people you didn't want to know said 'Yes, we have no bananas', and it seemed only a question of a few years before the older people would step aside and let the world be run by those who saw things as they were and it all seems rosy and romantic to us who were young then, because we will never feel quite so intensely about our surroundings any more.",
      "The houses over to Central Park West went first, they got darker as if dissolving into the dark sky until I couldn't make them out, and then the trees began to lose their shape, and finally, this was toward the end of the season, maybe it was late February of that very cold winter, and all I could see were these phantom shapes of the white ice, that last light, went gray and then altogether black, and then all my sight was gone though I could hear clearly the scoot scut of the blades on ice, a very satisfying sound, a soft sound though full of intention, a deeper tone that you'd expect made by the skate blades, perhaps for having sounded the resonant basso of the water under the ice, scoot scut, scoot scut.",
      'While the men made bullets and the women lint, while a large saucepan of melted brass and lead, destined to the bullet-mould smoked over a glowing brazier, while the sentinels watched, weapon in hand, on the barricade, while Enjolras, whom it was impossible to divert, kept an eye on the sentinels, Combeferre, Courfeyrac, Jean Prouvaire, Feuilly, Bossuet, Joly, Bahorel, and some others, sought each other out and united as in the most peaceful of days of their conversations in their student life, and, in one corner of this wine-shop which had been converted into a casement, a couple of paces distant from the redoubt which they had built, with their carbines loaded and primed resting against the backs of their chairs, these fine young fellows, so close to a supreme hour, began to recite love verses.',
      'But Pake knew a hundred dirt road shortcuts, steering them through scabland and slope country, in and out of the tiger shits, over the tawny plain still grooved with pilgrim wagon ruts, into early darkness and the first storm laying down black ice, hard orange dawn, the world smoking, snaking dust devils on bare dirt, heat boiling out of the sun until the paint on the truck hood curled, ragged webs of dry rain that never hit the ground, through small-town traffic and stock on the road, band of horses in morning fog, two redheaded cowboys moving a house that filled the roadway and Pake busting around and into the ditch to get past, leaving junkyards and Mexican cafes behind, turning into midnight motel entrances with RING OFFICE BELL signs or steering onto the black prairie for a stunned hour of sleep.',
      "Elizabeth, New Jersey, when my mother was being raised there in a flat over her father's grocery store, was an industrial port a quarter the size of Newark, dominated by the Irish working class and their politicians and the tightly knit parish life that revolved around the town's many churches, and though I never heard her complain of having been pointedly ill-treated in Elizabeth as a girl, it was not until she married and moved to Newark's new Jewish neighborhood that she discovered the confidence that led her to become first a PTA \"grade mother,\" then a PTA vice president in charge of establishing a Kindergarten Mothers' Club, and finally the PTA president, who, after attending a conference in Trenton on infantile paralysis, proposed an annual March of Dimes dance on January 30 - President Roosevelt's birthday - that was accepted by most schools.",
      "He had time for one subversive thought about his parents' Nordic Pleasurelines shoulder bags - either Nordic Pleasurelines sent bags like these to every booker of its cruises as a cynical means of getting inexpensive walk-about publicity or as a practical means of tagging the cruise participants for greater ease of handling at embarkation points or as a benign means of building espirit de corps; or else Enid and Alfred had deliberately saved the bags from some previous Nordic Pleasurelines cruise, and, out a misguided sense of loyalty, had chosen to carry them on their upcoming cruise as well; and in either case Chip was appalled by his parents' willingness to make themselves vectors of corporate advertising - before he shouldered the bags himself and assumed the burden of seeing LaGuardia Airport and New York City and his life and clothes and body through the disappointed eyes of his parents.",
    ],
  };

  let letterSetRef, symbolSetRef, wordMaxRef, sentenceRef;

  const letterSetRefCallback = (el) => {
    letterSetRef = el;
  };
  const symbolSetRefCallback = (el) => {
    symbolSetRef = el;
  };
  const wordMaxRefCallback = (el) => {
    wordMaxRef = el;
  };
  const sentenceRefCallback = (el) => {
    sentenceRef = el;
  };

  const generate = () => {
    let generated = [];
    if (state.type === 'letters') {
      let set = letterSets[letterSetRef.value].split('');
      while (generated.length < 99)
        generated.push(
          generated.length != 0 && (generated.length + 1) % 5 === 0
            ? ' '
            : randomFrom(set)
        );
    } else if (state.type === 'symbols') {
      let set = symbolSets[symbolSetRef.value].split('');
      while (generated.length < 99)
        generated.push(
          generated.length != 0 && (generated.length + 1) % 5 === 0
            ? ' '
            : randomFrom(set)
        );
    } else if (state.type === 'words') {
      generated = randomWords({
        exactly: 20,
        maxLength: wordMaxRef.value,
        join: ' ',
      }).split('');
    } else {
      generated = randomFrom(sentences[sentenceRef.value]).split('');
    }
    generated = generated.join('');
    setNextLetter(generated[0]);
    return generated;
  };

  const onKeyDown = (e) => {
    if (
      state.locked ||
      document.activeElement.tagName === 'TEXTAREA' ||
      document.activeElement.tagName === 'INPUT'
    )
      return;
    if (state.start === null) setState('start', Date.now());
    let allowed = ['Backspace'],
      key =
        store.emulate && store.mapping[e.key] ? store.mapping[e.key] : e.key;
    if (
      !allowed.includes(key) &&
      !/^[a-zA-Z0-9 `~!@#$%^&*()-_=+;:'"[\]{}\|,<.>\/?]$/.test(key)
    )
      return;
    e.preventDefault();
    if (key === 'Backspace') setState('typed', (t) => t.slice(0, t.length - 1));
    else setState('typed', (t) => [...t, key]);
    let target = state.text[state.typed.length - 1].toLowerCase();
    if (target !== ' ' && target !== key.toLowerCase()) {
      let errors = { ...state.errors };
      errors[target] = errors[target] ? errors[target] + 1 : 1;
      setState({ errors });
    }
    setNextLetter(state.text[state.typed.length]);

    if (state.typed.length >= state.text.length) {
      setState({ locked: true });
      setTimeout(
        () =>
          setState({
            typed: [],
            text: generate(),
            start: null,
            locked: false,
            errors: {},
          }),
        5000
      );
    }
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

  const onGenChange = (e) => {
    setState({ text: generate(), typed: [], start: null, errors: {} });
    document.activeElement.blur();
  };

  const zeroedNaN = (n) => {
    return isNaN(n) ? 0 : n;
  };

  const prettyErrors = () => {
    return Object.entries(state.errors)
      .sort((a, b) => b[1] - a[1])
      .reduce(
        (p, c) =>
          (p += `<span class="label">${c[0]}:</span><span class="${
            c[1] < 10 ? 'medium' : 'low'
          }">${c[1]} </span>`),
        ''
      );
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
      <header>
        <Options
          state={state}
          setState={setState}
          onGenChange={onGenChange}
          letterSetRef={letterSetRefCallback}
          symbolSetRef={symbolSetRefCallback}
          wordMaxRef={wordMaxRefCallback}
          sentenceRef={sentenceRefCallback}
        />
        <div class={styles.stats}>
          Progress: {state.progress}% | Accuracy: {zeroedNaN(state.accuracy)}% |
          gWPM: {zeroedNaN(state.wpm.gross)} | nWPM: {zeroedNaN(state.wpm.net)}
        </div>
      </header>
      <div class={styles.text} tabIndex={0}>
        <For each={state.text.split('')}>
          {(letter, i) => (
            <span
              class={styles.letter}
              classList={{
                [styles.untyped]: !state.typed[i()],
                [styles.active]: i() === state.typed.length,
                [styles.correct]: state.typed[i()] === letter,
                [styles.incorrect]:
                  state.typed[i()] && state.typed[i()] !== letter,
              }}
            >
              {letter}
            </span>
          )}
        </For>
      </div>
      <Show when={state.locked}>
        <div class={styles.finalStats}>
          <span class="label">Accuracy: </span>
          <span
            class={
              zeroedNaN(state.accuracy) < 50
                ? 'low'
                : zeroedNaN(state.accuracy) > 90
                ? 'high'
                : 'medium'
            }
          >
            {zeroedNaN(state.accuracy)}%
          </span>
          <span class="label">gWPM: </span>
          <span
            class={
              zeroedNaN(state.wpm.gross) < 20
                ? 'low'
                : zeroedNaN(state.wpm.gross) > 90
                ? 'high'
                : 'medium'
            }
          >
            {zeroedNaN(state.wpm.gross)}
          </span>
          <span class="label">nWPM: </span>
          <span
            class={
              zeroedNaN(state.wpm.net) < 20
                ? 'low'
                : zeroedNaN(state.wpm.net) > 90
                ? 'high'
                : 'medium'
            }
          >
            {zeroedNaN(state.wpm.net)}
          </span>
          <Show when={Object.keys(state.errors).length > 0}>
            <span class="label">Mistakes: </span>{' '}
            <span innerHTML={prettyErrors()} />
          </Show>
        </div>
      </Show>
    </div>
  );
}

export default Typer;
