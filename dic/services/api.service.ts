import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from './config';
import { ApiResponse, ErrorResponse } from './types';
import { TokenService } from './auth/tokenService';
import { AuthService } from './auth/auth.service';
export class ApiService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
     async (config) => {
        const token = TokenService.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If unauthorized and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Attempt to refresh token
            const newToken = await AuthService.refreshAccessToken();
            
            if (newToken) {
              // Retry the original request with new token
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.api(originalRequest);
            }
          } catch {
            // If refresh fails, logout user
            AuthService.logout();
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private handleError(error: AxiosError<ErrorResponse>) {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }



  
  // Method to handle form data submission
  async postForm<T>(url: string, data: Record<string, any>): Promise<AxiosResponse<T>> {
    const formData = new FormData();
    
    // Convert object to FormData
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return this.api.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.api.request<ApiResponse<T>>(config);
    return response.data;
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'GET', url: endpoint, params });
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'POST', url: endpoint, data });
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'PUT', url: endpoint, data });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'DELETE', url: endpoint });
  }

  async uploadFormData<T>(
    endpoint: string,
    formData: FormData,
    onProgress?: (percentage: number) => void
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url: endpoint,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentage);
        }
      },
    });
  }
}

export const apiService = new ApiService();