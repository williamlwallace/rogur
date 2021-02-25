import { SET_ORIGIN, SET_DESTINATION } from './types';

const initialState = {
  origin: null,
  destination: null,
  name: null,
  number: null,
}

function reducer(state = initialState, { type, payload = null }) {
  switch (type) {
    case SET_ORIGIN:
      return setOrigin(state, payload);
    case SET_DESTINATION:
      return setDestination(state, payload);
    default:
      return state;
  }
}

function setOrigin(state, payload) {
  return {
    ...state,
    origin: payload
  }
}

function setDestination(state, payload) {
  return {
    ...state,
    destination: payload
  }
}

export default reducer;