import { Link } from 'solid-app-router';
import Nav from '../components/common/Nav/Nav';
import Button from '../components/common/Button/Button';
import styles from './index.module.css';
import Typewriter from '../components/Typewriter/Typewriter';
import { onMount } from 'solid-js';
import Keyboard from '../components/Keyboard/keyboard';
import Stars from '../components/Stars/Stars';

export default function Home() {
  let basicRef, trainRef, basicsButtonRef;

  onMount(() => {
    basicsButtonRef.focus();
  });
  return (
    <div class={styles.Home}>
      <Nav />
      <div ref={basicRef} class={styles.container}>
        <Stars />
        <div class={styles.basic}>
          <h1>
            <Typewriter>Learn Touch Typing!</Typewriter>
          </h1>

          {/* <Link href="/basics"> */}
          <Button
            ref={basicsButtonRef}
            onClick={() => trainRef.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn Basics (Soon!)
          </Button>
          {/* </Link> */}
        </div>
        <div
          class={styles.arrow}
          onClick={() => trainRef.scrollIntoView({ behavior: 'smooth' })}
        >
          ⬇
        </div>
      </div>
      <div ref={trainRef} class={styles.container}>
        <div
          class={`${styles.arrow} ${styles.up} ${styles.dark}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ⬆
        </div>
        <div class={styles.train}>
          <Keyboard minimal />
          <div>
            <h1>Trainer</h1>
            <p>The best way to get better is training.</p>
            <p> This app will always be free to all.</p>
            <Link href="/trainer">
              <Button
                style={{
                  'background-color': 'var(--color-lighter)',
                  'margin-top': '20px',
                }}
              >
                Start Training
              </Button>
            </Link>
          </div>
        </div>
        <div
          class={styles.banner}
          style={{
            'background-color': 'var(--color-dark)',
            color: 'var(--color-lighter)',
          }}
        >
          <div class={styles.banneritem}>7 Premade Layouts</div>
          <div class={styles.banneritem}>4 Categories</div>
          <div class={styles.banneritem}>Multiple Sets and Options</div>
        </div>
        <div
          class={styles.banner}
          style={{
            'background-color': 'var(--color-lighter)',
          }}
        >
          <div class={styles.banneritem}>
            <h2>What do I do?</h2>
            <p>
              Learn the basics if you don't already know how to touch type. Then
              practice at your leisure! The more you train, the better you'll
              become.
            </p>
          </div>
          <div class={styles.banneritem}>
            <h2>Accounts?</h2>
            <p>
              Currently there is no support for accounts. In the future, this
              may become a part of the site. Perhaps multiplayer games as well!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
