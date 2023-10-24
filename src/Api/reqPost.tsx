import axios from 'axios'

export const reqPost = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})
