import axios from 'axios';

import { LOCAL_API_URL } from '../constants';

const setAuthToken = (token: any) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

const axiosBaseUrl = () => {
  axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? LOCAL_API_URL : '';
  return axios;
};

export {
  setAuthToken,
  axiosBaseUrl
};
