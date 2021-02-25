import { SET_ORIGIN, SET_DESTINATION } from './types';

function setOrigin(data) {
  return {
    type: SET_ORIGIN,
    payload: data || {}
  }
}

function setDestination(data) {
  return {
    type: SET_DESTINATION,
    payload: data || {}
  }
}

const actionCreators = {
  setOrigin,
  setDestination,
}

export { actionCreators }