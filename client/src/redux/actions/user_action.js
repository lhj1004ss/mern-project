import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';

export function loginUser(data) {
  const request = axios.post('http://localhost:5000/api/users/login', data).then(res => res.data)
  
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(data) {
  const request = axios.post('http://localhost:5000/api/users/register', data).then(res => res.data)
  
  return {
    type: REGISTER_USER,
    payload: request
  }
}