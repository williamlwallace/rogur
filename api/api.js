import axios from 'axios';

export function createUser(data) {
    axios.post('http://192.168.1.117:3000/user', data)
      .then(response => console.log(response))
      .catch(error => console.log(error))
}