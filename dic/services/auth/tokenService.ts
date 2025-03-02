
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string;
  exp: number;
  accountType: 'student' | 'staff' | 'admin';
}

export class TokenService {
  private static ACCESS_TOKEN_KEY = 'access_token';
  private static REFRESH_TOKEN_KEY = 'refresh_token';

  // Store tokens securely
  static setTokens(tokens: { accessToken: string; refreshToken: string }): void {
    // Use HttpOnly cookies in production
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
  }

  // Remove tokens on logout
  static clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  // Get access token
  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  // Get refresh token
  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // Check if token is valid
  static isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  // Get user account type from token
  static getUserAccountType(): 'student' | 'staff' | 'admin' | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.accountType;
    } catch {
      return null;
    }
  }

  // Get user ID from token
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
}