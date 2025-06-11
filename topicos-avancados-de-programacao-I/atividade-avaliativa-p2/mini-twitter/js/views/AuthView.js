/**
 * AuthView.js - View para gerenciamento de autenticação
 *
 * Responsabilidades (SRP):
 * - Renderizar formulários de login/registro
 * - Manipular transições de tela de auth
 * - Validar campos visuais
 * - Gerenciar estados visuais dos forms
 *
 * Princípios aplicados:
 * - SRP: Single Responsibility - apenas UI de autenticação
 * - OCP: Open/Closed - extensível para novos tipos de auth
 * - Interface Segregation: métodos específicos para cada ação
 *
 * Pattern: Observer - notifica Controller sobre eventos
 */

class AuthView extends BaseView {
  constructor() {
    super();
    this.initializeElements();
    this.setupEventListeners();
  }

  /**
   * Inicializar elementos DOM específicos da autenticação
   * Template Method Pattern - implementação específica
   */
  initializeElements() {
    this.elements = {
      // Seções principais
      authScreen: this.getElementById("auth-screen"),
      loginSection: this.getElementById("login-section"),
      registerSection: this.getElementById("register-section"),

      // Tabs de navegação
      loginTab: this.getElementById("login-tab"),
      registerTab: this.getElementById("register-tab"),

      // Formulários
      loginForm: this.getElementById("login-form"),
      registerForm: this.getElementById("register-form"),

      // Campos do login
      loginEmail: this.getElementById("login-email"),
      loginPassword: this.getElementById("login-password"),

      // Campos do registro
      registerUsername: this.getElementById("register-username"),
      registerEmail: this.getElementById("register-email"),
      registerPassword: this.getElementById("register-password"),
    };
  }

  /**
   * Configurar event listeners
   * Delegation Pattern - centraliza gerenciamento de eventos
   */
  setupEventListeners() {
    // Não fazemos a lógica aqui, apenas preparamos para o Controller
    // O Controller vai registrar os handlers usando os métodos públicos
  }

  /**
   * Métodos públicos para o Controller registrar eventos
   * Interface Segregation Principle
   */

  onLoginSubmit(handler) {
    if (this.elements.loginForm) {
      this.elements.loginForm.addEventListener("submit", handler);
    }
  }

  onRegisterSubmit(handler) {
    if (this.elements.registerForm) {
      this.elements.registerForm.addEventListener("submit", handler);
    }
  }

  onLoginTabClick(handler) {
    if (this.elements.loginTab) {
      this.elements.loginTab.addEventListener("click", handler);
    }
  }

  onRegisterTabClick(handler) {
    if (this.elements.registerTab) {
      this.elements.registerTab.addEventListener("click", handler);
    }
  }

  /**
   * Métodos de apresentação visual
   * Separation of Concerns - apenas apresentação
   */

  showLoginForm() {
    // Mostrar seção de login e esconder registro
    this.show(this.elements.loginSection);
    this.hide(this.elements.registerSection);

    // Atualizar visual das abas - Design System aplicado
    this.setClasses(
      this.elements.loginTab,
      "flex-1 py-3 px-4 bg-blue-500 text-white rounded-md font-medium transition-all shadow-sm"
    );
    this.setClasses(
      this.elements.registerTab,
      "flex-1 py-3 px-4 bg-transparent text-gray-600 rounded-md font-medium transition-all hover:bg-white"
    );
  }

  showRegisterForm() {
    // Mostrar seção de registro e esconder login
    this.hide(this.elements.loginSection);
    this.show(this.elements.registerSection);

    // Atualizar visual das abas - Consistent UI Pattern
    this.setClasses(
      this.elements.loginTab,
      "flex-1 py-3 px-4 bg-transparent text-gray-600 rounded-md font-medium transition-all hover:bg-white"
    );
    this.setClasses(
      this.elements.registerTab,
      "flex-1 py-3 px-4 bg-green-500 text-white rounded-md font-medium transition-all shadow-sm"
    );
  }

  hideAuthScreen() {
    this.hide(this.elements.authScreen);
  }

  showAuthScreen() {
    this.show(this.elements.authScreen);
  }

  /**
   * Métodos para coleta de dados dos formulários
   * Data Transfer Object Pattern
   */

  getLoginData() {
    return {
      email: this.elements.loginEmail?.value || "",
      password: this.elements.loginPassword?.value || "",
    };
  }

  getRegisterData() {
    return {
      username: this.elements.registerUsername?.value || "",
      email: this.elements.registerEmail?.value || "",
      password: this.elements.registerPassword?.value || "",
    };
  }

  /**
   * Limpar formulários após uso
   * Clean State Pattern
   */

  clearLoginForm() {
    this.clearForm("login-form");
  }

  clearRegisterForm() {
    this.clearForm("register-form");
  }

  clearAllForms() {
    this.clearLoginForm();
    this.clearRegisterForm();
  }

  /**
   * Validação visual dos campos
   * Early Validation Pattern - feedback imediato ao usuário
   */

  validateLoginForm() {
    const data = this.getLoginData();
    const validation = this.validateForm(data);

    // Visual feedback para campos inválidos
    this.updateFieldValidation("login-email", data.email);
    this.updateFieldValidation("login-password", data.password);

    return validation;
  }

  validateRegisterForm() {
    const data = this.getRegisterData();

    // Validações específicas para registro
    const errors = [];

    if (!data.username || data.username.length < 3) {
      errors.push("Username deve ter pelo menos 3 caracteres");
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push("Email deve ter formato válido");
    }

    if (!data.password || data.password.length < 6) {
      errors.push("Senha deve ter pelo menos 6 caracteres");
    }

    // Visual feedback
    this.updateFieldValidation(
      "register-username",
      data.username,
      data.username.length >= 3
    );
    this.updateFieldValidation(
      "register-email",
      data.email,
      this.isValidEmail(data.email)
    );
    this.updateFieldValidation(
      "register-password",
      data.password,
      data.password.length >= 6
    );

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Feedback visual para validação de campos
   * Visual Feedback Pattern
   */
  updateFieldValidation(fieldId, value, isValid = null) {
    const field = this.getElementById(fieldId);
    if (!field) return;

    if (isValid === null) {
      isValid = value && value.trim() !== "";
    }

    // Remove classes de validação anteriores
    field.classList.remove("border-red-500", "border-green-500");

    // Adiciona classe baseada na validação
    if (value && value.trim() !== "") {
      field.classList.add(isValid ? "border-green-500" : "border-red-500");
    }
  }

  /**
   * Utilidades de validação
   * Utility Pattern
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Estados de loading para formulários
   * Loading State Pattern - UX enhancement
   */
  setLoginLoading(isLoading) {
    const submitBtn = this.elements.loginForm?.querySelector(
      'button[type="submit"]'
    );
    if (submitBtn) {
      submitBtn.disabled = isLoading;
      submitBtn.textContent = isLoading ? "Entrando..." : "Entrar";
    }
  }

  setRegisterLoading(isLoading) {
    const submitBtn = this.elements.registerForm?.querySelector(
      'button[type="submit"]'
    );
    if (submitBtn) {
      submitBtn.disabled = isLoading;
      submitBtn.textContent = isLoading ? "Criando conta..." : "Criar conta";
    }
  }

  /**
   * Mensagens de feedback específicas para auth
   * Override do método base para contexto específico
   */
  showAuthMessage(message, type = "info") {
    // Pode ser melhorado com toast notifications
    // Por enquanto usa o método base
    this.showMessage(message, type);
  }
}
