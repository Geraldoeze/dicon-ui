import { jwtDecode } from "jwt-decode";
import { StorageUtils } from "../../lib/storageUtils";

interface TokenPayload {
  sub: string;
  exp: number;
  accountType: "student" | "staff" | "admin";
}

export class TokenService {
  // Storage keys with app prefix for better organization
  private static APP_PREFIX = "dic_portal_";
  private static ACCESS_TOKEN_KEY = `${TokenService.APP_PREFIX}access_token`;
  private static REFRESH_TOKEN_KEY = `${TokenService.APP_PREFIX}refresh_token`;
  private static USER_CACHE_KEY = `${TokenService.APP_PREFIX}user_cache`;

  /**
   * Store tokens securely
   *
   * @param tokens The access and refresh tokens to store
   */
  static setTokens(tokens: {
    accessToken: string;
    refreshToken: string;
  }): void {
    // For production, consider using HttpOnly cookies instead
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
    if (tokens.refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
    }
  }

  /**
   * Remove tokens and all user-related cached data on logout
   */
  static clearTokens(): void {
    // Clear all token storage
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);

    // Clear user cache
    localStorage.removeItem(this.USER_CACHE_KEY);

    // Clear all items with our app prefix
    StorageUtils.clearItemsByPrefix(this.APP_PREFIX);
  }

  /**
   * Get access token
   *
   * @returns The current access token or null
   */
  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Get refresh token
   *
   * @returns The current refresh token or null
   */
  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Check if token is valid and not expired
   *
   * @param token The token to validate
   * @returns Whether the token is valid
   */
  static isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      // Add buffer time (30 seconds) to prevent edge cases
      return decoded.exp * 1000 > Date.now() + 30000;
    } catch {
      return false;
    }
  }

  /**
   * Get user account type from token
   *
   * @returns The user account type or null
   */
  static getUserAccountType(): "student" | "staff" | "admin" | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      
      return decoded.accountType;
    } catch {
      return null;
    }
  }

  /**
   * Extract account type from a given token
   * Useful for server-side middleware
   *
   * @param token The JWT token to decode
   * @returns The user account type or null
   */
  static getUserAccountTypeFromToken(
    token: string
  ): "student" | "staff" | "admin" | null {
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.accountType;
    } catch {
      return null;
    }
  }

  /**
   * Get user ID from token
   *
   * @returns The user ID or null
   */
  static getUserId(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.sub;
    } catch {
      return null;
    }
  }

  /**
   * Cache user data in local storage
   *
   * @param userData The user data to cache
   */
  static cacheUserData<T>(userData: T): void {
    StorageUtils.setItem(this.USER_CACHE_KEY, userData);
  }

  /**
   * Get cached user data
   *
   * @returns The cached user data or null
   */
  static getCachedUserData<T>(): T | null {
    return StorageUtils.getItem<T>(this.USER_CACHE_KEY);
  }
}
