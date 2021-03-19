import axios from "axios";

// USER
export function createUser(data) {
  return axios.post("http://" + process.env.LOCAL_IP + ":3000/user/signup", data);
}

export function loginUser(data) {
  return axios.post("http://" + process.env.LOCAL_IP + ":3000/user/login", data);
}

export function getUser(data) {
  return axios.get("http://" + process.env.LOCAL_IP + ":3000/user", {
    headers: {
      token: data,
    },
  });
}

export function updateUser(data) {
  return axios.put("http://" + process.env.LOCAL_IP + ":3000/user", data)
}

// RIDES
export function createRide(data) {
  return axios.post("http://" + process.env.LOCAL_IP + ":3000/ride/create", data);
}