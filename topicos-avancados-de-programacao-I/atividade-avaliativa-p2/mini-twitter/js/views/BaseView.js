/**
 * BaseView.js - Classe base para todas as Views (VERSÃO DEFENSIVA)
 *
 * Princípios aplicados:
 * - SRP: Responsável apenas por operações básicas de View
 * - DRY: Evita repetição de código comum entre Views
 * - Template Method Pattern: Define estrutura base para Views
 * - Defensive Programming: Não falha quando elementos não existem
 *
 * Benefícios da separação View-Controller:
 * - Controllers focam na lógica de negócio
 * - Views focam na apresentação
 * - Facilita testes unitários
 * - Melhora manutenibilidade
 */

class BaseView {
  constructor() {
    this.elements = {};
    this.initializeElements();
  }

  /**
   * Template Method Pattern
   * Cada View filha deve implementar este método
   */
  initializeElements() {
    // Implementado pelas classes filhas
  }

  /**
   * Utilitários para manipulação de DOM
   * Seguindo o princípio DRY - Don't Repeat Yourself
   * DEFENSIVE PROGRAMMING - não gera erros se elemento não existe
   */

  // Buscar elemento por ID (versão defensiva)
  getElementById(id) {
    const element = document.getElementById(id);
    // Removido o console.warn para evitar spam no console
    // Em production, elementos podem não existir inicialmente
    return element;
  }

  // Buscar elemento por seletor
  querySelector(selector) {
    return document.querySelector(selector);
  }

  // Buscar múltiplos elementos
  querySelectorAll(selector) {
    return document.querySelectorAll(selector);
  }

  // Mostrar elemento (remover classe hidden) - DEFENSIVO
  show(element) {
    if (typeof element === "string") {
      element = this.getElementById(element);
    }
    if (element) {
      element.classList.remove("hidden");
    }
  }

  // Esconder elemento (adicionar classe hidden) - DEFENSIVO
  hide(element) {
    if (typeof element === "string") {
      element = this.getElementById(element);
    }
    if (element) {
      element.classList.add("hidden");
    }
  }

  // Toggle visibility - DEFENSIVO
  toggle(element) {
    if (typeof element === "string") {
      element = this.getElementById(element);
    }
    if (element) {
      element.classList.toggle("hidden");
    }
  }

  // Adicionar classe - DEFENSIVO
  addClass(element, className) {
    if (typeof element === "string") {
      element = this.getElementById(element);
    }
    if (element && className) {
      element.classList.add(className);
    }
  }

  // Remover classe - DEFENSIVO
  removeClass(element, className) {
    if (typeof element === "string") {
      element = this.getElementById(element);
    }
    if (element && className) {
      element.classList.remove(className);
    }
  }

  // Definir classes CSS completas - DEFENSIVO
  setClasses(element, classes) {
    if (typeof element === "string") {
      element = this.getElementById(element);
    }
    if (element && classes) {
      element.className = classes;
    }
  }

  // Limpar formulário - DEFENSIVO
  clearForm(formId) {
    const form = this.getElementById(formId);
    if (form && typeof form.reset === "function") {
      form.reset();
    }
  }

  // Definir texto de elemento - DEFENSIVO
  setText(element, text) {
    if (typeof element === "string") {
      element = this.getElementById(element);
    }
    if (element && text !== undefined) {
      element.textContent = text;
    }
  }

  // Definir HTML de elemento - DEFENSIVO
  setHTML(element, html) {
    if (typeof element === "string") {
      element = this.getElementById(element);
    }
    if (element && html !== undefined) {
      element.innerHTML = html;
    }
  }

  // Adicionar event listener com binding automático - DEFENSIVO
  addEventListenter(element, event, handler) {
    if (typeof element === "string") {
      element = this.getElementById(element);
    }
    if (element && event && handler) {
      element.addEventListener(event, handler.bind(this));
    }
  }

  /**
   * Método para exibir mensagens de feedback
   * Segue princípios de UX Design para feedback ao usuário
   */
  showMessage(message, type = "info") {
    // Implementação básica com alert (pode ser melhorada)
    if (message) {
      alert(message);
    }
  }

  /**
   * Validação básica de formulários
   * Princípio: Fail Fast - detectar erros cedo
   */
  validateForm(formData) {
    const errors = [];

    // Validações básicas podem ser implementadas aqui
    if (formData && typeof formData === "object") {
      for (const [key, value] of Object.entries(formData)) {
        if (!value || (typeof value === "string" && value.trim() === "")) {
          errors.push(`Campo ${key} é obrigatório`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Método utilitário para verificar se elemento existe
   * Evita tentativas de manipulação desnecessárias
   */
  elementExists(id) {
    return document.getElementById(id) !== null;
  }

  /**
   * Método para inicialização gradual de elementos
   * Permite que Views funcionem mesmo com HTML incompleto
   */
  safeInitializeElement(id, callback) {
    const element = this.getElementById(id);
    if (element && typeof callback === "function") {
      callback(element);
    }
  }
}
