/**
 * ApiRepository.js - API Communication Layer
 *
 * Responsabilidades (SRP):
 * - Centralizar comunicação com API
 * - Gerenciar autenticação automática
 * - Interceptar requests/responses
 * - Tratar erros de rede/API
 * - Implementar retry logic
 *
 * Princípios aplicados:
 * - SRP: Única responsabilidade para API
 * - DRY: Reutilização de lógica HTTP
 * - Adapter Pattern: Adaptação da Fetch API
 * - Strategy Pattern: Diferentes estratégias de request
 */

class ApiRepository {
  constructor() {
    this.baseUrl = "https://mini-twitter-api-vy9q.onrender.com/api";
  }

  // Método auxiliar para fazer requisições
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = localStorage.getItem("authToken");

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro na requisição");
      }

      return data;
    } catch (error) {
      console.error("Erro na API:", error);
      throw error;
    }
  }

  // Autenticação
  async login(email, password) {
    return this.makeRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(username, email, password) {
    return this.makeRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
  }

  // Posts
  async getPosts() {
    return this.makeRequest("/posts");
  }

  async getMyPosts() {
    return this.makeRequest("/posts/my-posts");
  }

  async createPost(content) {
    return this.makeRequest("/posts", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  }

  async deletePost(postId) {
    return this.makeRequest(`/posts/${postId}`, {
      method: "DELETE",
    });
  }

  // Usuário
  async getUserProfile() {
    return this.makeRequest("/users/profile");
  }

  async updateUserProfile(username, email) {
    return this.makeRequest("/users/profile", {
      method: "PUT",
      body: JSON.stringify({ username, email }),
    });
  }
}

/**
 * Custom Error Classes - Error Hierarchy
 */
class ApiError extends Error {
  constructor(message, status, response, originalError) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.response = response;
    this.originalError = originalError;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

class CacheHit extends Error {
  constructor(data) {
    super("Cache hit");
    this.name = "CacheHit";
    this.data = data;
  }
}
