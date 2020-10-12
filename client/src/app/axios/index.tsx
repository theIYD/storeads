import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error && error.response && error.response.status === 401) {
      sessionStorage.removeItem('accessToken');
    }

    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common.Authorization;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default instance;
