import { CREATE_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER } from '../types';
import * as api from '../../api/api';

export function createUser(data) {
  return function(dispatch) {
    return api
      .createUser(data)
        .then(response => dispatch(createUserSuccess(response)))
        .catch(error => console.log(error));
  }
}

function createUserSuccess(data) {
  return {
    type: CREATE_USER,
    payload: data || {}
  }
}

export function loginUser(data) {
  return function(dispatch) {
    return api
      .loginUser(data)
        .then(response => {
          api.getUser(response.data.token)
            .then(response => dispatch(loginUserSuccess(response)))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
  }
}

function loginUserSuccess(data) {
  return {
    type: LOGIN_USER,
    payload: data || {}
  }
}

export function logoutUser() {
  return function(dispatch) {
    dispatch(logoutUserSuccess())
  }
}

function logoutUserSuccess() {
  return {
    type: LOGOUT_USER,
    payload: {}
  }
}

export function updateUser(data) {
  return function(dispatch) {
    return api
      .updateUser(data)
        .then(response => dispatch(updateUserSuccess(response)))
        .catch(error => console.log(error));
  }
}

function updateUserSuccess(data) {
  return {
    type: UPDATE_USER,
    payload: data || {}
  }
}