import axios from 'axios';
import { instanceToPlain } from 'class-transformer';

const request = axios.create();

request.defaults.baseURL = 'https://dummyjson.com';
request.defaults.timeout = 3000;

request.interceptors.request.use(
  config => {
    return {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'application/json',
      },
      data: instanceToPlain(config.data),
    };
  },
  error => error,
);

request.interceptors.response.use(
  response => response,
  error => error,
);

export default request;
