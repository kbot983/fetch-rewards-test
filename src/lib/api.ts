import axios from "axios";
import { redirect } from "react-router-dom";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - perhaps you need to log in?");
      redirect("/");
    }
    return Promise.reject(error);
  },
);

export default api;
