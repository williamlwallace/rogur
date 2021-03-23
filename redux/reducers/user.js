import { CREATE_USER, GET_USER, LOGIN_USER, LOGOUT_USER } from '../types';

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
    case LOGOUT_USER:
      return logoutUser(state, payload);
    case GET_USER:
      return getUser(state, payload);
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
  }
}

function logoutUser(state, payload) {
  return {
    ...state,
    isLoggedIn: false,
  }
}

function getUser(state, payload) {
  return {
    ...state,
    user: payload.data
  }
}

export default reducer;