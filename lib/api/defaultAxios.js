import axios from 'axios';

const baseURL = 'http://localhost:3065';

export const defaultAxios = axios.create({
  baseURL,
});
