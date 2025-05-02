/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/auth/improvedAuthService.ts
import { apiService } from '../api.service';
import { TokenService } from './tokenService';
import { 
  LoginCredentials, 
  UserProfile, 
  PasswordChangeRequest, 
  ServerLoginResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest
} from '../types';
import { AUTH_ENDPOINTS } from '@/services/config';

export class AuthService {
  /**
   * Authenticates a user with the given login credentials.
   *
   * @param {LoginCredentials} credentials - The username and password of the user.
   * @returns {Promise<UserProfile>} A promise that resolves to the authenticated user profile.
   * @throws {Error} Throws an error if the login attempt fails.
   */
  static async login(credentials: LoginCredentials): Promise<UserProfile> {
    try {
      const response = await apiService.postForm<ServerLoginResponse>(AUTH_ENDPOINTS.LOGIN, {
        username: credentials.username,
        password: credentials.password
      });
      
      // Store tokens
      TokenService.setTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token || '' // Handle case where refresh token isn't provided
      });

      // Create user profile object
      const userProfile: UserProfile = {
        id: response.data.user_id,
        account_type_id: response.data.account_type,
        account_type: this.getAccountTypeString(response.data.account_type),
        photo_url: '',
        title: null,
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        state: '',
        local_government: '',
        address: '',
        gender: '',
        date_of_birth: null,
        next_of_kin_name: '',
        created_at: '',
        updated_at: ''
      };
      
      // Cache initial user profile
      TokenService.cacheUserData(userProfile);
      
      // Fetch complete user profile and update cache
      this.getCurrentUser()
        .then(fullProfile => {
          if (fullProfile) {
            TokenService.cacheUserData(fullProfile);
          }
        })
        .catch(() => null);

      setTimeout(() => this.redirectToDashboard(response.data.account_type), 100);
      return userProfile;
    } catch (error: any) {
      // Standardized error handling
      console.error('Login error:', error);
      
      if (error.response?.data) {
        throw new Error(error.response.data.detail || 'Login failed');
      }
      
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  /**
   * Logs out the current user by clearing local storage and redirecting to login page.
   * No server-side logout endpoint needed with token-based authentication.
   * 
   * Important: This method handles clearing all application cache and user data.
   *
   * @returns {void}
   */
  static logout(): void {
    try {
      // Clear auth tokens and all user-related cached data
      TokenService.clearTokens();
      
      // When running in browser environment
      if (typeof window !== 'undefined') {
        // Force page reload to clear any in-memory state
        window.location.href = '/portal/login';
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if something goes wrong, still try to redirect
      if (typeof window !== 'undefined') {
        window.location.href = '/portal/login';
      }
    }
  }

  /**
   * Changes the user's password.
   *
   * @param {PasswordChangeRequest} passwordForm - The current and new password information.
   * @returns {Promise<void>} A promise that resolves when password change is complete.
   * @throws {Error} Throws an error if the password change fails.
   */
  static async changePassword(passwordForm: PasswordChangeRequest): Promise<void> {
    try {
      await apiService.post('/students/change-password', passwordForm);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Password change failed. Please try again.';
      throw new Error(errorMessage);
    }
  }

  /**
   * Retrieves the current user's profile information.
   * Uses cached data first if available and valid token exists.
   *
   * @returns {Promise<UserProfile | null>} A promise that resolves to the user profile or null if not authenticated.
   */
  static async getCurrentUser(): Promise<UserProfile | null> {
    // First check if token is valid
    if (!TokenService.isTokenValid(TokenService.getAccessToken())) {
      return null;
    }

    // Check for cached user data
    const cachedUser = TokenService.getCachedUserData<UserProfile>();
    if (cachedUser) {
      return cachedUser;
    }

    // Fetch from API if no cache
    try {
      const response = await apiService.get<UserProfile>('/auth/user');
      // Cache the fetched user data
      TokenService.cacheUserData(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // If fetching user fails, clear tokens
      TokenService.clearTokens();
      return null;
    }
  }

  /**
   * Initiates the forgot password process by sending a reset email.
   *
   * @param {ForgotPasswordRequest} request - The user's email address.
   * @returns {Promise<{ success: boolean, message: string }>} A promise that resolves to a success message.
   * @throws {Error} Throws an error if the request fails.
   */
  static async forgotPassword(request: ForgotPasswordRequest): Promise<{ success: boolean, message: string }> {
    try {
      const response = await apiService.post(AUTH_ENDPOINTS.FORGOT_PASSWORD(request.email), {});
      return {
        success: true,
        message: 'Password reset instructions have been sent to your email.'
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Failed to process your request. Please try again.';
      throw new Error(errorMessage);
    }
  }

  /**
   * Resets the user's password using a token from the email.
   *
   * @param {ResetPasswordRequest} request - The reset password information including token.
   * @returns {Promise<{ success: boolean, message: string }>} A promise that resolves to a success message.
   * @throws {Error} Throws an error if the password reset fails.
   */
  static async resetPassword(request: ResetPasswordRequest): Promise<{ success: boolean, message: string }> {
    try {
      await apiService.post(AUTH_ENDPOINTS.RESET_PASSWORD, request);
      return {
        success: true, 
        message: 'Your password has been successfully reset. You can now log in with your new password.'
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Password reset failed. Please try again.';
      throw new Error(errorMessage);
    }
  }

  /**
   * Refreshes the access token using the refresh token.
   *
   * @returns {Promise<string | null>} A promise that resolves to the new access token or null if refresh fails.
   */
  static async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = TokenService.getRefreshToken();
      if (!refreshToken) return null;

      const response = await apiService.post<{ accessToken: string }>('/auth/refresh', {
        refreshToken
      });

      // Update access token
      TokenService.setTokens({
        accessToken: response.data.accessToken,
        refreshToken: refreshToken
      });
      
      return response.data.accessToken;
    } catch {
      // If refresh fails, logout user
      this.logout();
      return null;
    }
  }

  /**
   * Redirects the user to the appropriate dashboard based on account type.
   *
   * @param {number} accountType - The account type ID.
   */
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

  /**
   * Gets the string representation of an account type from its numeric ID.
   * 
   * @param {number} accountTypeId - The account type ID.
   * @returns {string} The string representation of the account type.
   */
  private static getAccountTypeString(accountTypeId: number): string {
    switch (accountTypeId) {
      case 1: return 'Student';
      case 2: return 'Staff';
      case 3: return 'Admin';
      default: return 'Unknown';
    }
  }
}