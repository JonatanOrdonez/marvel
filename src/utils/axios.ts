import axios from 'axios';
import {
  MARVEL_API_PRIVATE_KEY,
  MARVEL_API_PUBLIC_KEY,
  MARVEL_API_URL,
} from '../config/env';
import {md5} from './hashAlgorithms';

export const axiosInstance = axios.create({
  baseURL: MARVEL_API_URL,
});

axiosInstance.interceptors.request.use(config => {
  const ts = new Date().getTime();
  const hash = md5(`${ts}${MARVEL_API_PRIVATE_KEY}${MARVEL_API_PUBLIC_KEY}`);

  config.params = {
    ...config.params,
    ts,
    apikey: MARVEL_API_PUBLIC_KEY,
    hash,
  };
  return config;
});
