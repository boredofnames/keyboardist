import Keyboard from '../../components/Keyboard/Keyboard';
import useRedux from '../../store/useRedux';
import reduxStore from '../../store/store';
import actions from '../../store/actions';
import Nav from '../../components/common/Nav/Nav';

export default function Basics() {
  const [store] = useRedux(reduxStore, actions);
  console.log(store.letter);
  return (
    <div>
      <Nav />
      Welcome to Basics! {store.letter}
      <Keyboard />
    </div>
  );
}
