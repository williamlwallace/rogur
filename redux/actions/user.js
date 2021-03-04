import { CREATE_USER } from '../types';
import * as api from '../../api/api';

export function createUser(data) {
  return function(dispatch) {
    return api
      .createUser(data)
        .then(response => dispatch(createUserSuccess(response)))
        .catch(error => console.log(error))
  }
}

function createUserSuccess(data) {
  return {
    type: CREATE_USER,
    payload: data || {}
  }
}