/**
 * StorageRepository.js - Local Storage Management
 *
 * Responsabilidades (SRP):
 * - Gerenciar dados no localStorage
 * - Tratar erros de quota/access
 * - Implementar fallbacks para storage
 * - Serializar/deserializar dados
 * - Implementar TTL para cache
 *
 * Princípios aplicados:
 * - SRP: Única responsabilidade para storage
 * - DRY: Reutilização de lógica de serialização
 * - Strategy Pattern: Diferentes estratégias de storage
 * - Error Boundaries: Tratamento de falhas de storage
 */

class StorageRepository {
  constructor() {
    // Storage configuration
    this.prefix = "mini-twitter-";
    this.defaultTTL = 86400000; // 24 hours in milliseconds

    // Fallback storage when localStorage is not available
    this.memoryStorage = new Map();
    this.isLocalStorageAvailable = this.checkLocalStorageAvailability();

    // Reserved keys
    this.KEYS = {
      TOKEN: "token",
      USER: "user",
      THEME: "theme",
      SETTINGS: "settings",
    };

    this.init();
  }

  /**
   * Initialization - Setup Storage
   */
  init() {
    if (!this.isLocalStorageAvailable) {
      console.warn("📦 localStorage not available, using memory fallback");
    } else {
      console.log("📦 StorageRepository initialized with localStorage");
    }

    // Clean expired items on initialization
    this.cleanExpired();
  }

  /**
   * Core Storage Methods - Public Interface
   */

  /**
   * Set Item with optional TTL
   */
  setItem(key, value, ttl = null) {
    try {
      const prefixedKey = this.getPrefixedKey(key);
      const data = this.createStorageItem(value, ttl);
      const serialized = this.serialize(data);

      if (this.isLocalStorageAvailable) {
        localStorage.setItem(prefixedKey, serialized);
      } else {
        this.memoryStorage.set(prefixedKey, serialized);
      }

      return true;
    } catch (error) {
      console.error("Storage setItem error:", error);
      return this.handleStorageError(error, "set", key, value);
    }
  }

  /**
   * Get Item with expiration check
   */
  getItem(key, defaultValue = null) {
    try {
      const prefixedKey = this.getPrefixedKey(key);
      let serialized;

      if (this.isLocalStorageAvailable) {
        serialized = localStorage.getItem(prefixedKey);
      } else {
        serialized = this.memoryStorage.get(prefixedKey);
      }

      if (serialized === null || serialized === undefined) {
        return defaultValue;
      }

      const data = this.deserialize(serialized);

      // Check if item is expired
      if (this.isExpired(data)) {
        this.removeItem(key);
        return defaultValue;
      }

      return data.value;
    } catch (error) {
      console.error("Storage getItem error:", error);
      return defaultValue;
    }
  }

  /**
   * Remove Item
   */
  removeItem(key) {
    try {
      const prefixedKey = this.getPrefixedKey(key);

      if (this.isLocalStorageAvailable) {
        localStorage.removeItem(prefixedKey);
      } else {
        this.memoryStorage.delete(prefixedKey);
      }

      return true;
    } catch (error) {
      console.error("Storage removeItem error:", error);
      return false;
    }
  }

  /**
   * Check if key exists and is not expired
   */
  hasItem(key) {
    const value = this.getItem(key, Symbol("not-found"));
    return value !== Symbol.for("not-found");
  }

  /**
   * Clear all app data
   */
  clear() {
    try {
      if (this.isLocalStorageAvailable) {
        // Remove only keys with our prefix
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(this.prefix)) {
            keysToRemove.push(key);
          }
        }

        keysToRemove.forEach((key) => localStorage.removeItem(key));
      } else {
        // Clear memory storage
        for (const key of this.memoryStorage.keys()) {
          if (key.startsWith(this.prefix)) {
            this.memoryStorage.delete(key);
          }
        }
      }

      return true;
    } catch (error) {
      console.error("Storage clear error:", error);
      return false;
    }
  }

  /**
   * Authentication Token Management
   */
  setToken(token) {
    return this.setItem(this.KEYS.TOKEN, token);
  }

  getToken() {
    return this.getItem(this.KEYS.TOKEN);
  }

  removeToken() {
    return this.removeItem(this.KEYS.TOKEN);
  }

  /**
   * User Data Management
   */
  setUser(user) {
    return this.setItem(this.KEYS.USER, user);
  }

  getUser() {
    return this.getItem(this.KEYS.USER);
  }

  removeUser() {
    return this.removeItem(this.KEYS.USER);
  }

  /**
   * Theme Management
   */
  setTheme(theme) {
    return this.setItem(this.KEYS.THEME, theme);
  }

  getTheme() {
    return this.getItem(this.KEYS.THEME);
  }

  /**
   * Settings Management
   */
  setSettings(settings) {
    const currentSettings = this.getSettings();
    const mergedSettings = { ...currentSettings, ...settings };
    return this.setItem(this.KEYS.SETTINGS, mergedSettings);
  }

  getSettings() {
    return this.getItem(this.KEYS.SETTINGS, {});
  }

  setSetting(key, value) {
    const settings = this.getSettings();
    settings[key] = value;
    return this.setSettings(settings);
  }

  getSetting(key, defaultValue = null) {
    const settings = this.getSettings();
    return settings[key] !== undefined ? settings[key] : defaultValue;
  }

  /**
   * Utility Methods - Helper Functions
   */

  /**
   * Create storage item with metadata
   */
  createStorageItem(value, ttl) {
    const now = Date.now();
    return {
      value,
      timestamp: now,
      expires: ttl ? now + ttl : null,
      version: "1.0",
    };
  }

  /**
   * Check if item is expired
   */
  isExpired(data) {
    if (!data.expires) return false;
    return Date.now() > data.expires;
  }

  /**
   * Get prefixed key
   */
  getPrefixedKey(key) {
    return `${this.prefix}${key}`;
  }

  /**
   * Serialize data for storage
   */
  serialize(data) {
    try {
      return JSON.stringify(data);
    } catch (error) {
      console.error("Serialization error:", error);
      return null;
    }
  }

  /**
   * Deserialize data from storage
   */
  deserialize(data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Deserialization error:", error);
      return null;
    }
  }

  /**
   * Check localStorage availability
   */
  checkLocalStorageAvailability() {
    try {
      const testKey = "__localStorage_test__";
      localStorage.setItem(testKey, "test");
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Maintenance Operations
   */

  /**
   * Clean expired items
   */
  cleanExpired() {
    try {
      const expiredKeys = [];

      if (this.isLocalStorageAvailable) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(this.prefix)) {
            const data = this.deserialize(localStorage.getItem(key));
            if (data && this.isExpired(data)) {
              expiredKeys.push(key);
            }
          }
        }

        expiredKeys.forEach((key) => localStorage.removeItem(key));
      } else {
        for (const [key, value] of this.memoryStorage.entries()) {
          if (key.startsWith(this.prefix)) {
            const data = this.deserialize(value);
            if (data && this.isExpired(data)) {
              expiredKeys.push(key);
            }
          }
        }

        expiredKeys.forEach((key) => this.memoryStorage.delete(key));
      }

      if (expiredKeys.length > 0) {
        console.log(`🧹 Cleaned ${expiredKeys.length} expired storage items`);
      }
    } catch (error) {
      console.error("Clean expired error:", error);
    }
  }

  /**
   * Get storage usage statistics
   */
  getStorageStats() {
    try {
      let totalSize = 0;
      let itemCount = 0;
      const items = {};

      if (this.isLocalStorageAvailable) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(this.prefix)) {
            const value = localStorage.getItem(key);
            const size = new Blob([value]).size;
            totalSize += size;
            itemCount++;

            const cleanKey = key.replace(this.prefix, "");
            items[cleanKey] = {
              size,
              lastModified: this.getItemTimestamp(cleanKey),
            };
          }
        }
      } else {
        for (const [key, value] of this.memoryStorage.entries()) {
          if (key.startsWith(this.prefix)) {
            const size = new Blob([value]).size;
            totalSize += size;
            itemCount++;

            const cleanKey = key.replace(this.prefix, "");
            items[cleanKey] = {
              size,
              lastModified: this.getItemTimestamp(cleanKey),
            };
          }
        }
      }

      return {
        totalSize,
        itemCount,
        items,
        storageType: this.isLocalStorageAvailable ? "localStorage" : "memory",
        quota: this.getStorageQuota(),
      };
    } catch (error) {
      console.error("Get storage stats error:", error);
      return null;
    }
  }

  /**
   * Get item timestamp
   */
  getItemTimestamp(key) {
    try {
      const prefixedKey = this.getPrefixedKey(key);
      let serialized;

      if (this.isLocalStorageAvailable) {
        serialized = localStorage.getItem(prefixedKey);
      } else {
        serialized = this.memoryStorage.get(prefixedKey);
      }

      if (!serialized) return null;

      const data = this.deserialize(serialized);
      return data?.timestamp || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get storage quota information
   */
  async getStorageQuota() {
    try {
      if ("storage" in navigator && "estimate" in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        return {
          quota: estimate.quota,
          usage: estimate.usage,
          available: estimate.quota - estimate.usage,
          percentUsed: Math.round((estimate.usage / estimate.quota) * 100),
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Error Handling - Storage Failure Management
   */
  handleStorageError(error, operation, key, value) {
    if (error.name === "QuotaExceededError") {
      console.warn("Storage quota exceeded, attempting cleanup...");

      // Try to clean expired items and retry
      this.cleanExpired();

      if (operation === "set") {
        try {
          const prefixedKey = this.getPrefixedKey(key);
          const data = this.createStorageItem(value);
          const serialized = this.serialize(data);

          if (this.isLocalStorageAvailable) {
            localStorage.setItem(prefixedKey, serialized);
          } else {
            this.memoryStorage.set(prefixedKey, serialized);
          }

          return true;
        } catch (retryError) {
          console.error("Storage retry failed:", retryError);
          return false;
        }
      }
    }

    // If localStorage fails, try memory storage
    if (this.isLocalStorageAvailable && operation === "set") {
      console.warn("localStorage failed, falling back to memory storage");
      this.isLocalStorageAvailable = false;
      return this.setItem(key, value);
    }

    return false;
  }

  /**
   * Data Migration - Version Management
   */
  migrate() {
    try {
      const version = this.getSetting("storageVersion", "1.0");

      if (version === "1.0") {
        // Migration logic for future versions
        console.log("Storage is up to date");
      }
    } catch (error) {
      console.error("Storage migration error:", error);
    }
  }

  /**
   * Import/Export - Data Portability
   */
  exportData() {
    try {
      const data = {};

      if (this.isLocalStorageAvailable) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(this.prefix)) {
            const cleanKey = key.replace(this.prefix, "");
            data[cleanKey] = localStorage.getItem(key);
          }
        }
      } else {
        for (const [key, value] of this.memoryStorage.entries()) {
          if (key.startsWith(this.prefix)) {
            const cleanKey = key.replace(this.prefix, "");
            data[cleanKey] = value;
          }
        }
      }

      return {
        version: "1.0",
        timestamp: Date.now(),
        data,
      };
    } catch (error) {
      console.error("Export data error:", error);
      return null;
    }
  }

  importData(exportedData) {
    try {
      if (!exportedData || !exportedData.data) {
        throw new Error("Invalid export data");
      }

      // Clear existing data
      this.clear();

      // Import data
      for (const [key, value] of Object.entries(exportedData.data)) {
        const prefixedKey = this.getPrefixedKey(key);

        if (this.isLocalStorageAvailable) {
          localStorage.setItem(prefixedKey, value);
        } else {
          this.memoryStorage.set(prefixedKey, value);
        }
      }

      return true;
    } catch (error) {
      console.error("Import data error:", error);
      return false;
    }
  }

  /**
   * Debugging Support
   */
  debug() {
    console.group("📦 Storage Debug Info");
    console.log(
      "Available:",
      this.isLocalStorageAvailable ? "localStorage" : "memory"
    );
    console.log("Stats:", this.getStorageStats());
    console.log("All items:");

    const allItems = {};
    Object.values(this.KEYS).forEach((key) => {
      allItems[key] = this.getItem(key);
    });

    console.table(allItems);
    console.groupEnd();
  }

  // Salvar dados do usuário
  saveUser(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }

  // Obter dados do usuário
  getUser() {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }

  // Salvar token de autenticação
  saveAuthToken(token) {
    localStorage.setItem("authToken", token);
  }

  // Obter token de autenticação
  getAuthToken() {
    return localStorage.getItem("authToken");
  }

  // Verificar se usuário está logado
  isLoggedIn() {
    return this.getAuthToken() !== null;
  }

  // Limpar dados (logout)
  clearAll() {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  }
}
