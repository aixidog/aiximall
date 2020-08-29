import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: '',
    timeout: 3000
  })
  return instance(config);
}

export function requestUser(config) {
  const instance = axios.create({
    baseURL: '',
    timeout: 3000,
    method: 'post'
  })
  return instance(config);
}