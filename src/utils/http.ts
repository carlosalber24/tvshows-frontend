import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.response.use(function (response) {
  if (response.data && response.data.success === false) {
    return Promise.reject(response.data.message);
  }

  return response.data.response;
}, function (error) {
  return Promise.reject(error.response && error.response.data);
});

export default instance;