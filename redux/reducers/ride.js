import { CREATE_RIDE } from '../types';

const initialState = {
  ride: null
}

function reducer(state = initialState, { type, payload = null }) {
  switch (type) {
    case CREATE_RIDE:
      return createRide(state, payload);
    default:
      return state;
  }
}

function createRide(state, payload) {
  return {
    ...state,
    ride: payload
  }
}

export default reducer;