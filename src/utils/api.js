/**
 *
 * token.js
 * axios default headers setup
 */

import axios from 'axios';

const token = localStorage.getItem('token')    

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // replase your database link
  headers: token ? {
    Authorization: `Bearer ${token}` // Authorization token
  }:{}
});


export const setToken = token => {
  console.log('settoken');
  
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token)
  } else {
    delete api.defaults.headers['Authorization'];
    localStorage.removeItem('token')
  }
};

export default api;
