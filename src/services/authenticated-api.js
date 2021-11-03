import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  let token = document.cookie.split("=")[1];

  if (/;/i.test(token)) {
    token = document.cookie.split("token=")[1].split(";")[0];
  }

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default axiosInstance;
