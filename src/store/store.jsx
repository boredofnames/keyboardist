import { createStore } from 'redux';
import storage from '../js/storage';

const app = (
  state = {
    layout: storage.get('layout') || 'qwerty',
    emulate: storage.get('emulate') || false,
    letter: null,
  },
  action
) => {
  switch (action.type) {
    case 'TOGGLE_EMULATE':
      return { ...state, emulate: !state.emulate };
    case 'SET_LAYOUT':
      return { ...state, layout: action.layout };

    case 'SET_NEXT_LETTER':
      return {
        ...state,
        letter: (action.letter && action.letter.toLowerCase()) || ' ',
      };

    default:
      return state;
  }
};

export default createStore(app);
