// Authentication Service for Admin Panel
const AUTH_STORAGE_KEY = 'admin_auth_token';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export class AuthService {
  // Admin credentials
  static ADMIN_CREDENTIALS = {
    username: 'RekhaPowerlift',
    password: 'RekhaWPC@telangana'
  };

  // Login method
  static login(username, password) {
    if (username === this.ADMIN_CREDENTIALS.username && 
        password === this.ADMIN_CREDENTIALS.password) {
      
      const authData = {
        isAuthenticated: true,
        username: username,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + SESSION_DURATION).toISOString()
      };
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      return { success: true, message: 'Login successful' };
    }
    
    return { success: false, message: 'Invalid username or password' };
  }

  // Logout method
  static logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return { success: true, message: 'Logged out successfully' };
  }

  // Check if user is authenticated
  static isAuthenticated() {
    try {
      const authData = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!authData) return false;

      const parsed = JSON.parse(authData);
      const now = new Date().toISOString();
      
      // Check if session has expired
      if (now > parsed.expiresAt) {
        this.logout();
        return false;
      }

      return parsed.isAuthenticated === true;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  // Get current user info
  static getCurrentUser() {
    try {
      const authData = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!authData) return null;

      const parsed = JSON.parse(authData);
      return {
        username: parsed.username,
        loginTime: parsed.loginTime,
        expiresAt: parsed.expiresAt
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Extend session
  static extendSession() {
    try {
      const authData = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!authData) return false;

      const parsed = JSON.parse(authData);
      parsed.expiresAt = new Date(Date.now() + SESSION_DURATION).toISOString();
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(parsed));
      return true;
    } catch (error) {
      console.error('Error extending session:', error);
      return false;
    }
  }
}

export default AuthService;