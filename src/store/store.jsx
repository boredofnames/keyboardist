import { createStore } from 'redux';
import storage from '../js/storage';

const app = (
  state = {
    emulate: storage.get('emulate') || false,
    emulateFrom: storage.get('emulatefrom') || 'qwerty',
    layout: storage.get('layout') || 'qwerty',
    customLayout: storage.get('customLayout') || {
      number: {
        main: { left: '`12345', right: '67890-=' },
        caps: { left: '~!@#$%', right: '^&*()_+' },
      },
      top: {
        main: { left: 'qwert', right: 'yuiop[]\\' },
        caps: { left: 'QWERT', right: 'YUIOP{}|' },
      },
      mid: {
        main: { left: 'asdfg', right: "hjkl;'" },
        caps: { left: 'ASDFG', right: 'HJKL:"' },
      },
      bottom: {
        main: { left: 'zxcvb', right: 'nm,./' },
        caps: { left: 'ZXCVB', right: 'NM<>?' },
      },
      space: {
        main: { left: ' ', right: ' ' },
        caps: { left: ' ', right: ' ' },
      },
    },
    letter: null,
    mapping: {},
    standard: 'ansi',
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

    case 'SET_CUSTOM_LAYOUT':
      return { ...state, customLayout: action.layout };

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

    case 'SET_STANDARD':
      return {
        ...state,
        standard: action.standard,
      };

    default:
      return state;
  }
};

export default createStore(app);
