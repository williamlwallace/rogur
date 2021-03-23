import { CREATE_USER, GET_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER } from '../types';
import ajaxCallError from './ajaxCallError';
import * as api from '../../api/api';

export function createUser(data) {
  return function(dispatch) {
    return api
      .createUser(data)
      .then(
        response => dispatch(createUserSuccess(response)),
        error => dispatch(ajaxCallError(error))
      );
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
      .then(
        response => dispatch(loginUserSuccess(response)),
        error => dispatch(ajaxCallError(error))
      );
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

export function getUser(data) {
  return function(dispatch) {
    return api
      .getUser(data)
      .then(
        response => dispatch(getUserSuccess(response)),
        error => dispatch(ajaxCallError(error))
      );
  }
}

function getUserSuccess(data) {
  return {
    type: GET_USER,
    payload: data || {}
  }
}

export function updateUser(data) {
  return function(dispatch) {
    return api
      .updateUser(data)
      .then(
        response => dispatch(updateUserSuccess(response)),
        error => dispatch(ajaxCallError(error))
      );
  }
}

function updateUserSuccess(data) {
  return {
    type: UPDATE_USER,
    payload: data || {}
  }
}