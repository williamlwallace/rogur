import axios from "axios";

const API = "https://rogur.herokuapp.com"

// USER
export function createUser(data) {
  return axios.post(`${API}/user/signup`, data);
}

export function loginUser(data) {
  return axios.post(`${API}/user/login`, data);
}

export function getUser(data) {
  return axios.get(`${API}/user`, {
    headers: {
      token: data,
    },
  });
}

export function updateUser(data) {
  return axios.put(`${API}/user`, data)
}

// RIDES
export function createRide(data) {
  return axios.post(`${API}/ride/create`, data);
}