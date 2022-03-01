export default {
  toggleEmulate: () => ({ type: 'TOGGLE_EMULATE' }),
  setLayout: (layout) => ({ type: 'SET_LAYOUT', layout }),
  setNextLetter: (letter) => ({ type: 'SET_NEXT_LETTER', letter }),
};
