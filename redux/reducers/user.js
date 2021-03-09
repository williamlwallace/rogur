import { CREATE_USER, LOGIN_USER } from '../types';

const initialState = {
  isLoggedIn: false,
  user: null
}

function reducer(state = initialState, { type, payload = null }) {
  switch (type) {
    case CREATE_USER:
      return createUser(state, payload);
    case LOGIN_USER:
      return loginUser(state, payload);
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

function loginUser(state, payload) {
  return {
    ...state,
    isLoggedIn: true,
    user: payload.data
  }
}

export default reducer;