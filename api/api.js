import axios from "axios";

// USER
export function createUser(data) {
  return axios.post("https://rogur.herokuapp.com/user/signup", data);
}

export function loginUser(data) {
  return axios.post("https://rogur.herokuapp.com/user/login", data);
}

export function getUser(data) {
  return axios.get("https://rogur.herokuapp.com/user", {
    headers: {
      token: data,
    },
  });
}

export function updateUser(data) {
  return axios.put("https://rogur.herokuapp.com/user", data)
}

// RIDES
export function createRide(data) {
  return axios.post("https://rogur.herokuapp.com/ride/create", data);
}