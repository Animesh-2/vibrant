// src/api/apiClient.ts
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";
import Cookies from "js-cookie";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// ------------------------------------------------------------
// REQUEST INTERCEPTOR — attach access token
// ------------------------------------------------------------
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get("authToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ------------------------------------------------------------
// RESPONSE INTERCEPTOR — if 401, logout + redirect
// ------------------------------------------------------------
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    // If unauthorized → logout user
    if (status === 401) {
      Cookies.remove("authToken");

      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
