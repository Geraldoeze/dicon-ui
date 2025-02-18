// src/lib/auth/authService.ts
import { apiService } from '../api.service';
import { TokenService } from './tokenService';
import { 
  LoginCredentials, 
  UserProfile, 
  PasswordChangeRequest, 
  ServerLoginResponse
} from '../types';

export class AuthService {
  // Login method
  static async login(credentials: LoginCredentials): Promise<UserProfile> {
    try {
      const response = await apiService.postForm<ServerLoginResponse>('/auth/login', {
        username: credentials.username,
        password: credentials.password
      });
      
      // Store tokens
      TokenService.setTokens({
        accessToken: response.data.access_token,
        refreshToken: '' // If refresh token is not provided
      });

       // Create user profile object
       const userProfile: UserProfile = {
        id: response.data.user_id,
        accountType: response.data.account_type
      };
      
      return userProfile;
    } catch (error:any) {
      // Standardized error handling
      console.error('Login error:', error);
      
      if (error.response?.data) {
        throw new Error(error.response.data.detail || 'Login failed');
      }
      
      throw new Error('Login failed. Please check your credentials.');
    
    }
  }

  // Logout method
  static async logout(): Promise<void> {
    try {
      // Invalidate refresh token on server
      await apiService.post('/auth/logout', {
        refreshToken: TokenService.getRefreshToken()
      });
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Authenticates a user with the given login credentials.
 *
 * @param {LoginCredentials} credentials - The email and password of the user.
 * @returns {Promise<User>} A promise that resolves to the authenticated user object.
 * @throws {Error} Throws an error if the login attempt fails.
 */

/******  0f283b2c-1874-4077-8e61-2a3d399eb9fa  *******/    } catch {
      // Ignore errors, as we want to clear local tokens anyway
    } finally {
      // Always clear local tokens
      TokenService.clearTokens();
      
      // Redirect to login page
      window.location.href = '/portal/login';
    }
  }

  // Change password method
  static async changePassword(passwordForm: PasswordChangeRequest): Promise<void> {
    try {
      await apiService.post('/students/change-password', passwordForm);
    } catch (error:any) {
      throw new Error('Password change failed. Please try again.');
    }
  }

  // Get current user profile
  static async getCurrentUser(): Promise<UserProfile | null> {
    if (!TokenService.isTokenValid(TokenService.getAccessToken())) {
      return null;
    }

    try {
      const response = await apiService.get<UserProfile>('/auth/user');
      return response.data;
    } catch {
      // If fetching user fails, clear tokens
      TokenService.clearTokens();
      return null;
    }
  }

  // Refresh token method
  static async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = TokenService.getRefreshToken();
      if (!refreshToken) return null;

      const response = await apiService.post<{ accessToken: string }>('/auth/refresh', {
        refreshToken
      });

      // Update access token
      localStorage.setItem('access_token', response.data.accessToken);
      return response.data.accessToken;
    } catch {
      // If refresh fails, logout user
      this.logout();
      return null;
    }
  }

  // Redirect to appropriate dashboard based on account type
  static redirectToDashboard(accountType: number): void {
    switch (accountType) {
      case 1:
        window.location.href = '/portal/student';
        break;
      case 2:
        window.location.href = '/portal/staff';
        break;
      case 3:
        window.location.href = '/portal/admin';
        break;
      default:
        window.location.href = '/portal/login';
    }
  }
}