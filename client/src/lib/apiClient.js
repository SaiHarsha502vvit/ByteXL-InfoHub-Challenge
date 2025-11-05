import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.error || error?.message || "Unexpected error";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
