import { combineReducers } from 'redux';
import user from './user';
import ride from './ride';

export default combineReducers({
  user,
  ride
})