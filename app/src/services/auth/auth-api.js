import axios from "axios";

const AUTH_API = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: AUTH_API,
});

export default axiosInstance;
