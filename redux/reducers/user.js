import { CREATE_USER } from '../types';

const initialState = {
  user: null
}

function reducer(state = initialState, { type, payload = null }) {
  switch (type) {
    case CREATE_USER:
      return createUser(state, payload);
    default:
      return state;
  }
}

function createUser(state, payload) {
  return {
    ...state,
    user: payload
  }
}

export default reducer;