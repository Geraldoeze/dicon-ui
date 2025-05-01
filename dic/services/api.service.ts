/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, STRAPI_BASE_URL } from './config';
import { ApiResponse, ErrorResponse } from './types';
import { TokenService } from './auth/tokenService';
import { AuthService } from './auth/auth.service';

export class ApiService {
  api: AxiosInstance;
  strapi: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

     // Strapi API instance
     this.strapi = axios.create({
      baseURL: STRAPI_BASE_URL,
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

        // Fix: Properly check for 401 status
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
            // If refresh fails, logout user and redirect to login
            this.handleUnauthorized();
            return Promise.reject(error);
          }
        }

        // Handle other 401 errors that weren't fixed by token refresh
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }

        return Promise.reject(error);
      }
    );

    this.strapi.interceptors.request.use(
      async (config) => {
        // Get Strapi token if you have authentication set up for Strapi
        const strapiToken = localStorage.getItem('strapi_token');
        if (strapiToken) {
          config.headers.Authorization = `Bearer ${strapiToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // New centralized method to handle unauthorized responses
  private handleUnauthorized() {
    // Clear tokens first
    TokenService.clearTokens();
    
    // Then redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/portal/login';
    }
  }

  private handleError(error: AxiosError<ErrorResponse>) {
    if (error.response?.status === 401) {
      this.handleUnauthorized();
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

    try {
      return this.api.post<T>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      return this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.request<ApiResponse<T>>(config);
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<ErrorResponse>);
    }
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


  // Methods for Strapi API
  async strapiRequest<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.strapi.request<T>(config);
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async strapiGet<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await this.strapi.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async strapiPost<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await this.strapi.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async strapiPut<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await this.strapi.put<T>(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async strapiDelete<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.strapi.delete<T>(endpoint);
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<ErrorResponse>);
    }
  }
}

export const apiService = new ApiService();