import axios from 'axios';

export function createUser(data) {
  return axios.post('http://192.168.1.117:3000/user/signup', data);
}

export function loginUser(data) {
  return axios.post('http://192.168.1.117:3000/user/login', data);
}

export function getUser(data) {
  return axios.get('http://192.168.1.117:3000/user', {
    headers: {
      'token': data
    }
  });
}

export function createRide(data) {
  return axios.post('http://192.168.1.117:3000/ride', data);
}