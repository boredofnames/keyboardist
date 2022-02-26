import { createStore } from 'redux';

const app = (state = { layout: 'qwerty', emulate: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_EMULATE':
      return { ...state, emulate: !state.emulate };

    case 'SET_LAYOUT':
      return { ...state, layout: action.layout };

    default:
      return state;
  }
};

export default createStore(app);
