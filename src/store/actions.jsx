export default {
  toggleEmulate: () => ({ type: 'TOGGLE_EMULATE' }),
  setEmulateFrom: (emulateFrom) => ({ type: 'SET_EMULATE_FROM', emulateFrom }),
  setLayout: (layout) => ({ type: 'SET_LAYOUT', layout }),
  setCustomLayout: (layout) => ({
    type: 'SET_CUSTOM_LAYOUT',
    layout,
  }),
  setNextLetter: (letter) => ({ type: 'SET_NEXT_LETTER', letter }),
  setMapping: (mapping) => ({ type: 'SET_MAPPING', mapping }),
  setStandard: (standard) => ({ type: 'SET_STANDARD', standard }),
};
