import { createStore } from 'redux';
import storage from '../js/storage';

const app = (
  state = {
    emulate: storage.get('emulate') || false,
    emulateFrom: storage.get('emulatefrom') || 'qwerty',
    layout: storage.get('layout') || 'qwerty',
    letter: null,
    mapping: {},
  },
  action
) => {
  switch (action.type) {
    case 'TOGGLE_EMULATE':
      return { ...state, emulate: !state.emulate };

    case 'SET_EMULATE_FROM':
      return { ...state, emulateFrom: action.emulateFrom };

    case 'SET_LAYOUT':
      return { ...state, layout: action.layout };

    case 'SET_NEXT_LETTER':
      return {
        ...state,
        letter: (action.letter && action.letter) || ' ',
      };

    case 'SET_MAPPING':
      return {
        ...state,
        mapping: action.mapping,
      };

    default:
      return state;
  }
};

export default createStore(app);
