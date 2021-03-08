import { CREATE_RIDE } from '../types';
import * as api from '../../api/api';

export function createRide(data) {
  return function(dispatch) {
    return api
      .createRide(data)
        .then(response => dispatch(createRideSuccess(response)))
        .catch(error => console.log(error))
  }
}

function createRideSuccess(data) {
  return {
    type: CREATE_RIDE,
    payload: data || {}
  }
}