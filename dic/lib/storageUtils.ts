/**
 * Utility class for managing browser storage (localStorage)
 * with proper type handling and cache management
 */
export class StorageUtils {
  /**
   * Get an item from localStorage with type safety
   *
   * @param key The storage key
   * @returns The parsed value or null if not found
   */
  static getItem<T>(key: string): T | null {
    if (typeof window === "undefined") {
      // localStorage doesn't exist on the server
      return null;
    }

    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  /**
   * Set an item in localStorage with JSON stringification
   *
   * @param key The storage key
   * @param value The value to store
   */
  static setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Remove an item from localStorage
   *
   * @param key The storage key to remove
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear all items that match a prefix pattern
   * Useful for clearing all user-related data
   *
   * @param prefix The prefix to match
   */
  static clearItemsByPrefix(prefix: string): void {
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }

  /**
   * Clear all application storage
   * Use this carefully as it will remove all app data
   *
   * @param appPrefix The application prefix to clear (e.g., 'myapp_')
   */
  static clearAppStorage(appPrefix: string): void {
    this.clearItemsByPrefix(appPrefix);
  }
}
