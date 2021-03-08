import axios from 'axios';

export function createUser(data) {
  return axios.post('http://192.168.1.117:3000/user', data)
}

export function createRide(data) {
  return axios.post('http://192.168.1.117:3000/ride', data)
}