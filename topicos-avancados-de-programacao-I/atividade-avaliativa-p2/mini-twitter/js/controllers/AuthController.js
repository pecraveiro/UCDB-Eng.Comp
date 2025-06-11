/**
 * AuthController.js - Authentication Controller
 *
 * Responsabilidades (SRP):
 * - Gerenciar autenticação de usuários
 * - Validar dados de entrada
 * - Coordenar entre API e Storage
 * - Emitir eventos de mudança de estado
 *
 * Aplica os princípios:
 * - SRP: Single Responsibility Principle
 * - OCP: Open/Closed Principle
 * - LSP: Liskov Substitution Principle
 * - ISP: Interface Segregation Principle
 * - DIP: Dependency Inversion Principle
 */

class AuthController {
  /**
   * Dependency Injection - DIP Principle
   * Recebe todas as dependências via construtor
   */
  constructor(apiRepository, storageRepository) {
    this.apiRepository = apiRepository;
    this.storageRepository = storageRepository;
    this.initializeEvents();
  }

  initializeEvents() {
    // Form de login
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => this.handleLogin(e));

    // Form de registro
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", (e) => this.handleRegister(e));

    // Tabs de navegação
    document
      .getElementById("login-tab")
      .addEventListener("click", () => this.showLoginForm());
    document
      .getElementById("register-tab")
      .addEventListener("click", () => this.showRegisterForm());

    // Navegação principal
    document
      .getElementById("feed-btn")
      .addEventListener("click", () => this.showFeed());
    document
      .getElementById("logo-home")
      .addEventListener("click", () => this.showFeed());

    // Botão de logout
    document
      .getElementById("logout-btn")
      .addEventListener("click", () => this.logout());
  }

  async handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await this.apiRepository.login(email, password);

      // Salvar dados no localStorage
      this.storageRepository.saveAuthToken(response.token);
      this.storageRepository.saveUser(response.user);

      // Mostrar interface principal
      this.showMainApp();
      this.updateNavButtons("feed");
      alert("Login realizado com sucesso!");
    } catch (error) {
      alert("Erro no login: " + error.message);
    }
  }

  async handleRegister(e) {
    e.preventDefault();

    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
      const response = await this.apiRepository.register(
        username,
        email,
        password
      );

      // Salvar dados no localStorage
      this.storageRepository.saveAuthToken(response.token);
      this.storageRepository.saveUser(response.user);

      // Mostrar interface principal
      this.showMainApp();
      this.updateNavButtons("feed");
      alert("Conta criada com sucesso!");
    } catch (error) {
      alert("Erro no registro: " + error.message);
    }
  }

  showLoginForm() {
    // Mostrar seção de login e esconder registro
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("register-section").classList.add("hidden");

    // Atualizar visual das abas
    document.getElementById("login-tab").className =
      "flex-1 py-3 px-4 bg-blue-500 text-white rounded-md font-medium transition-all shadow-sm";
    document.getElementById("register-tab").className =
      "flex-1 py-3 px-4 bg-transparent text-gray-600 rounded-md font-medium transition-all hover:bg-white";
  }

  showRegisterForm() {
    // Mostrar seção de registro e esconder login
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("register-section").classList.remove("hidden");

    // Atualizar visual das abas
    document.getElementById("login-tab").className =
      "flex-1 py-3 px-4 bg-transparent text-gray-600 rounded-md font-medium transition-all hover:bg-white";
    document.getElementById("register-tab").className =
      "flex-1 py-3 px-4 bg-green-500 text-white rounded-md font-medium transition-all shadow-sm";
  }

  showMainApp() {
    document.getElementById("auth-screen").classList.add("hidden");
    document.getElementById("main-feed").classList.remove("hidden");
    document.getElementById("profile-screen").classList.add("hidden");
    document.getElementById("nav-buttons").classList.remove("hidden");
  }

  showFeed() {
    // Mostrar feed e esconder outras telas
    document.getElementById("main-feed").classList.remove("hidden");
    document.getElementById("profile-screen").classList.add("hidden");
    document.getElementById("auth-screen").classList.add("hidden");

    // Atualizar visual dos botões da navbar
    this.updateNavButtons("feed");
  }

  checkAuthStatus() {
    if (this.storageRepository.isLoggedIn()) {
      this.showMainApp();
      return true;
    }
    return false;
  }

  updateNavButtons(activeView) {
    const feedBtn = document.getElementById("feed-btn");
    const profileBtn = document.getElementById("profile-btn");

    // Reset classes
    feedBtn.className =
      "bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors";
    profileBtn.className =
      "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors";

    // Highlight active view
    if (activeView === "feed") {
      feedBtn.className =
        "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors";
      profileBtn.className =
        "bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors";
    } else if (activeView === "profile") {
      profileBtn.className =
        "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors";
      feedBtn.className =
        "bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors";
    }
  }

  logout() {
    this.storageRepository.clearAll();
    document.getElementById("auth-screen").classList.remove("hidden");
    document.getElementById("main-feed").classList.add("hidden");
    document.getElementById("profile-screen").classList.add("hidden");
    document.getElementById("nav-buttons").classList.add("hidden");
    alert("Logout realizado com sucesso!");
  }
}
