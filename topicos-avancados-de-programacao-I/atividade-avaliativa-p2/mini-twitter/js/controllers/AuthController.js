/**
 * AuthController.js - Authentication Controller (DEFENSIVO)
 *
 * Responsabilidades após refatoração (SRP):
 * - Coordenar autenticação entre API e Storage
 * - Validar regras de negócio
 * - Gerenciar estado da aplicação
 * - Coordenar com AuthView para apresentação
 *
 * Versão defensiva que funciona mesmo com HTML incompleto
 */

class AuthController {
  /**
   * Dependency Injection - DIP Principle
   * Agora recebe a View como dependência
   */
  constructor(apiRepository, storageRepository, authView) {
    this.apiRepository = apiRepository;
    this.storageRepository = storageRepository;
    this.authView = authView;

    this.setupViewEventHandlers();
    this.setupFallbackEventHandlers(); // Fallback para HTML atual
  }

  /**
   * Configurar handlers da View (se disponíveis)
   */
  setupViewEventHandlers() {
    try {
      if (this.authView) {
        // Form submissions
        this.authView.onLoginSubmit((e) => this.handleLogin(e));
        this.authView.onRegisterSubmit((e) => this.handleRegister(e));

        // Tab navigation
        this.authView.onLoginTabClick(() => this.showLoginForm());
        this.authView.onRegisterTabClick(() => this.showRegisterForm());
      }
    } catch (error) {
      console.log("View event handlers não disponíveis, usando fallback");
    }
  }

  /**
   * Fallback para HTML atual - Event Listeners diretos
   */
  setupFallbackEventHandlers() {
    // Form de login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => this.handleLogin(e));
    }

    // Form de registro
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => this.handleRegister(e));
    }

    // Tabs de navegação
    const loginTab = document.getElementById("login-tab");
    if (loginTab) {
      loginTab.addEventListener("click", () => this.showLoginForm());
    }

    const registerTab = document.getElementById("register-tab");
    if (registerTab) {
      registerTab.addEventListener("click", () => this.showRegisterForm());
    }

    // Navegação principal
    const feedBtn = document.getElementById("feed-btn");
    if (feedBtn) {
      feedBtn.addEventListener("click", () => this.showFeed());
    }

    const logoHome = document.getElementById("logo-home");
    if (logoHome) {
      logoHome.addEventListener("click", () => this.showFeed());
    }

    // Botão de logout
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => this.logout());
    }
  }

  /**
   * Handlers de eventos - lógica de negócio
   */
  async handleLogin(e) {
    e.preventDefault();

    // Tentar coletar dados via View, senão usar DOM diretamente
    let loginData;
    try {
      loginData = this.authView
        ? this.authView.getLoginData()
        : this.getLoginDataFallback();
    } catch (error) {
      loginData = this.getLoginDataFallback();
    }

    // Validação simples
    if (!loginData.email || !loginData.password) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    try {
      // Lógica de negócio
      const response = await this.apiRepository.login(
        loginData.email,
        loginData.password
      );

      // Persistência de dados
      this.storageRepository.saveAuthToken(response.token);
      this.storageRepository.saveUser(response.user);

      // Atualização de estado
      this.showMainApp();
      this.updateNavButtons("feed");

      // Carregar posts automaticamente após login
      console.log("🔄 Login realizado - carregando posts...");
      if (window.postController && window.postController.loadPosts) {
        setTimeout(() => window.postController.loadPosts(), 100);
      }

      alert("Login realizado com sucesso!");
    } catch (error) {
      alert("Erro no login: " + error.message);
    }
  }

  async handleRegister(e) {
    e.preventDefault();

    // Tentar coletar dados via View, senão usar DOM diretamente
    let registerData;
    try {
      registerData = this.authView
        ? this.authView.getRegisterData()
        : this.getRegisterDataFallback();
    } catch (error) {
      registerData = this.getRegisterDataFallback();
    }

    // Validação simples
    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password
    ) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    if (registerData.password.length < 6) {
      alert("Senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      // Lógica de negócio
      const response = await this.apiRepository.register(
        registerData.username,
        registerData.email,
        registerData.password
      );

      // Persistência
      this.storageRepository.saveAuthToken(response.token);
      this.storageRepository.saveUser(response.user);

      // Atualização
      this.showMainApp();
      this.updateNavButtons("feed");
      alert("Conta criada com sucesso!");
    } catch (error) {
      alert("Erro no registro: " + error.message);
    }
  }

  /**
   * Métodos de fallback para coleta de dados
   */
  getLoginDataFallback() {
    return {
      email: document.getElementById("login-email")?.value || "",
      password: document.getElementById("login-password")?.value || "",
    };
  }

  getRegisterDataFallback() {
    return {
      username: document.getElementById("register-username")?.value || "",
      email: document.getElementById("register-email")?.value || "",
      password: document.getElementById("register-password")?.value || "",
    };
  }

  /**
   * Métodos de coordenação - tentar View primeiro, depois fallback
   */
  showLoginForm() {
    try {
      if (this.authView && this.authView.showLoginForm) {
        this.authView.showLoginForm();
        return;
      }
    } catch (error) {
      // Fallback
    }

    // Fallback para HTML atual
    const loginSection = document.getElementById("login-section");
    const registerSection = document.getElementById("register-section");
    const loginTab = document.getElementById("login-tab");
    const registerTab = document.getElementById("register-tab");

    if (loginSection) loginSection.classList.remove("hidden");
    if (registerSection) registerSection.classList.add("hidden");

    if (loginTab) {
      loginTab.className =
        "flex-1 py-3 px-4 bg-blue-500 text-white rounded-md font-medium transition-all shadow-sm";
    }
    if (registerTab) {
      registerTab.className =
        "flex-1 py-3 px-4 bg-transparent text-gray-600 rounded-md font-medium transition-all hover:bg-white";
    }
  }

  showRegisterForm() {
    try {
      if (this.authView && this.authView.showRegisterForm) {
        this.authView.showRegisterForm();
        return;
      }
    } catch (error) {
      // Fallback
    }

    // Fallback para HTML atual
    const loginSection = document.getElementById("login-section");
    const registerSection = document.getElementById("register-section");
    const loginTab = document.getElementById("login-tab");
    const registerTab = document.getElementById("register-tab");

    if (loginSection) loginSection.classList.add("hidden");
    if (registerSection) registerSection.classList.remove("hidden");

    if (loginTab) {
      loginTab.className =
        "flex-1 py-3 px-4 bg-transparent text-gray-600 rounded-md font-medium transition-all hover:bg-white";
    }
    if (registerTab) {
      registerTab.className =
        "flex-1 py-3 px-4 bg-green-500 text-white rounded-md font-medium transition-all shadow-sm";
    }
  }

  showMainApp() {
    const authScreen = document.getElementById("auth-screen");
    const mainFeed = document.getElementById("main-feed");
    const profileScreen = document.getElementById("profile-screen");
    const navButtons = document.getElementById("nav-buttons");

    if (authScreen) authScreen.classList.add("hidden");
    if (mainFeed) mainFeed.classList.remove("hidden");
    if (profileScreen) profileScreen.classList.add("hidden");
    if (navButtons) navButtons.classList.remove("hidden");
  }

  showFeed() {
    const mainFeed = document.getElementById("main-feed");
    const profileScreen = document.getElementById("profile-screen");
    const authScreen = document.getElementById("auth-screen");

    if (mainFeed) mainFeed.classList.remove("hidden");
    if (profileScreen) profileScreen.classList.add("hidden");
    if (authScreen) authScreen.classList.add("hidden");

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

    if (!feedBtn || !profileBtn) return;

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

    const authScreen = document.getElementById("auth-screen");
    const mainFeed = document.getElementById("main-feed");
    const profileScreen = document.getElementById("profile-screen");
    const navButtons = document.getElementById("nav-buttons");

    if (authScreen) authScreen.classList.remove("hidden");
    if (mainFeed) mainFeed.classList.add("hidden");
    if (profileScreen) profileScreen.classList.add("hidden");
    if (navButtons) navButtons.classList.add("hidden");

    alert("Logout realizado com sucesso!");
  }

  /**
   * Getters para acesso a dados
   */
  getCurrentUser() {
    return this.storageRepository.getUser();
  }

  isAuthenticated() {
    return this.storageRepository.isLoggedIn();
  }
}
