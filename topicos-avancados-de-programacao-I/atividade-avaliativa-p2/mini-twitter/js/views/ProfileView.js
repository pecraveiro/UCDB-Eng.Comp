/**
 * ProfileView.js - View para gerenciamento do perfil (DEFENSIVA)
 *
 * Versão defensiva que funciona apenas com elementos existentes
 */

class ProfileView extends BaseView {
  constructor() {
    super();
    this.initializeElements();
  }

  initializeElements() {
    // Só inicializar elementos que realmente existem
    this.elements = {};

    this.safeAddElement("profileScreen", "profile-screen");
    this.safeAddElement("profileBtn", "profile-btn");
    this.safeAddElement("profileForm", "profile-form");
    this.safeAddElement("profileUsername", "profile-username");
    this.safeAddElement("profileEmail", "profile-email");
    this.safeAddElement("backToFeedBtn", "back-to-feed");
    this.safeAddElement("myPostsContainer", "my-posts-container");
  }

  safeAddElement(key, id) {
    const element = this.getElementById(id);
    if (element) {
      this.elements[key] = element;
    }
  }

  /**
   * Configurar event listeners do perfil
   */
  onProfileNavClick(handler) {
    if (this.elements.profileBtn && handler) {
      this.elements.profileBtn.addEventListener("click", handler);
    }
  }

  onProfileFormSubmit(handler) {
    if (this.elements.profileForm && handler) {
      this.elements.profileForm.addEventListener("submit", handler);
    }
  }

  onBackToFeedClick(handler) {
    if (this.elements.backToFeedBtn && handler) {
      this.elements.backToFeedBtn.addEventListener("click", handler);
    }
  }

  /**
   * Gerenciamento de navegação e exibição
   */
  showProfile() {
    this.show(this.elements.profileScreen);
    this.updateProfileNavigation(true);
  }

  hideProfile() {
    this.hide(this.elements.profileScreen);
    this.updateProfileNavigation(false);
  }

  updateProfileNavigation(isActive) {
    if (!this.elements.profileBtn) return;

    const activeClasses =
      "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors";
    const inactiveClasses =
      "bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors";

    this.setClasses(
      this.elements.profileBtn,
      isActive ? activeClasses : inactiveClasses
    );
  }

  /**
   * Renderização dos dados do perfil (simplificada)
   */
  renderProfile(userData) {
    if (!userData) return;

    // Preencher campos do formulário
    if (this.elements.profileUsername) {
      this.elements.profileUsername.value = userData.username || "";
    }
    if (this.elements.profileEmail) {
      this.elements.profileEmail.value = userData.email || "";
    }
  }

  /**
   * Coleta de dados do formulário
   */
  getProfileData() {
    return {
      username: this.elements.profileUsername?.value || "",
      email: this.elements.profileEmail?.value || "",
    };
  }

  /**
   * Validação simples do formulário
   */
  validateProfileForm() {
    const data = this.getProfileData();
    const errors = [];

    // Validação do username
    if (!data.username || data.username.length < 3) {
      errors.push("Username deve ter pelo menos 3 caracteres");
    }

    // Validação do email
    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push("Email deve ter formato válido");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Renderização simples dos posts do usuário
   */
  renderUserPosts(posts) {
    if (!this.elements.myPostsContainer) return;

    // Limpar container atual
    this.elements.myPostsContainer.innerHTML = "";

    // Verificar se há posts
    if (!posts || posts.length === 0) {
      this.showNoUserPosts();
      return;
    }

    // Renderizar cada post
    posts.forEach((post) => {
      const postElement = this.createUserPostElement(post);
      this.elements.myPostsContainer.appendChild(postElement);
    });
  }

  /**
   * Criar elemento de post do usuário (simplificado)
   */
  createUserPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4";
    postDiv.dataset.postId = post._id;

    // Template simplificado para posts do perfil
    postDiv.innerHTML = `
      <div class="flex items-start justify-between">
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-2">
            <time class="text-sm text-gray-500" datetime="${post.createdAt}">
              ${this.formatDate(post.createdAt)}
            </time>
            <button 
              onclick="if(window.postController) window.postController.deletePost('${
                post._id
              }')"
              class="text-red-500 hover:text-red-700 transition-colors text-sm"
              title="Deletar post"
            >
              🗑️ Deletar
            </button>
          </div>
          <div class="mt-2">
            <p class="text-gray-900 whitespace-pre-wrap">${this.escapeHtml(
              post.content
            )}</p>
          </div>
        </div>
      </div>
    `;

    return postDiv;
  }

  /**
   * Estado vazio para posts do usuário
   */
  showNoUserPosts() {
    if (this.elements.myPostsContainer) {
      this.elements.myPostsContainer.innerHTML = `
        <div class="text-center py-8">
          <div class="text-4xl mb-4">📝</div>
          <h4 class="text-lg font-semibold text-gray-700 mb-2">Nenhuma publicação ainda</h4>
          <p class="text-gray-500 text-sm">Compartilhe seus primeiros pensamentos!</p>
        </div>
      `;
    }
  }

  /**
   * Remoção dinâmica de post do perfil
   */
  removeUserPost(postId) {
    const postElement = this.elements.myPostsContainer?.querySelector(
      `[data-post-id="${postId}"]`
    );
    if (postElement) {
      postElement.remove();

      if (
        this.elements.myPostsContainer &&
        this.elements.myPostsContainer.children.length === 0
      ) {
        this.showNoUserPosts();
      }
    }
  }

  /**
   * Utilitários
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}
