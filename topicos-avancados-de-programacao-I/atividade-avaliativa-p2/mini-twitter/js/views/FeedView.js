/**
 * FeedView.js - View para gerenciamento do feed de posts (DEFENSIVA)
 *
 * Responsabilidades (SRP):
 * - Renderizar lista de posts
 * - Gerenciar formulário de criação de posts
 * - Controlar navegação do feed
 * - Manipular estados visuais dos posts
 *
 * Versão defensiva que funciona apenas com elementos existentes
 */

class FeedView extends BaseView {
  constructor() {
    super();
    this.initializeElements();
  }

  /**
   * Inicializar elementos DOM do feed
   * Apenas elementos que EXISTEM no HTML atual
   */
  initializeElements() {
    // Só inicializar elementos que realmente existem
    this.elements = {};

    // Verificar cada elemento antes de adicionar
    this.safeAddElement("mainFeed", "main-feed");
    this.safeAddElement("postForm", "post-form");
    this.safeAddElement("postTextarea", "post-content");
    this.safeAddElement("navButtons", "nav-buttons");
    this.safeAddElement("feedBtn", "feed-btn");
    this.safeAddElement("postsContainer", "posts-container");
    this.safeAddElement("charCounter", "char-count");
  }

  safeAddElement(key, id) {
    const element = this.getElementById(id);
    if (element) {
      this.elements[key] = element;
    }
  }

  /**
   * Configurar event listeners do feed
   */
  onPostSubmit(handler) {
    if (this.elements.postForm && handler) {
      this.elements.postForm.addEventListener("submit", handler);
    }
  }

  onPostTextChange(handler) {
    if (this.elements.postTextarea && handler) {
      this.elements.postTextarea.addEventListener("input", handler);
    }
  }

  onFeedNavClick(handler) {
    if (this.elements.feedBtn && handler) {
      this.elements.feedBtn.addEventListener("click", handler);
    }
  }

  /**
   * Gerenciamento de navegação visual
   */
  showFeed() {
    this.show(this.elements.mainFeed);
    this.show(this.elements.navButtons);
    this.updateFeedNavigation(true);
  }

  hideFeed() {
    this.hide(this.elements.mainFeed);
  }

  updateFeedNavigation(isActive) {
    if (!this.elements.feedBtn) return;

    const activeClasses =
      "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors";
    const inactiveClasses =
      "bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors";

    this.setClasses(
      this.elements.feedBtn,
      isActive ? activeClasses : inactiveClasses
    );
  }

  /**
   * Gerenciamento do formulário de posts
   */
  getPostData() {
    return {
      content: this.elements.postTextarea?.value || "",
    };
  }

  clearPostForm() {
    this.clearForm("post-form");
    this.updateCharCounter(0);
  }

  updateCharCounter(length) {
    if (this.elements.charCounter) {
      const remaining = 280 - length;
      this.setText(this.elements.charCounter, `${remaining}/280`);

      // Visual feedback baseado no limite
      if (remaining < 0) {
        this.addClass(this.elements.charCounter, "text-red-500");
      } else if (remaining < 20) {
        this.addClass(this.elements.charCounter, "text-yellow-500");
      } else {
        this.addClass(this.elements.charCounter, "text-gray-500");
      }
    }
  }

  /**
   * Renderização simples da lista de posts
   * Usando o container existente no HTML
   */
  renderPosts(posts) {
    if (!this.elements.postsContainer) return;

    // Limpar container atual
    this.elements.postsContainer.innerHTML = "";

    // Verificar se há posts
    if (!posts || posts.length === 0) {
      this.showEmptyState();
      return;
    }

    // Renderizar cada post
    posts.forEach((post) => {
      const postElement = this.createPostElement(post);
      this.elements.postsContainer.appendChild(postElement);
    });
  }

  /**
   * Criar elemento individual de post (simplificado)
   */
  createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.className =
      "bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow mb-4";
    postDiv.dataset.postId = post._id;

    // Template simplificado do post
    postDiv.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            ${post.author.username.charAt(0).toUpperCase()}
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">
              @${this.escapeHtml(post.author.username)}
            </p>
            <div class="flex items-center space-x-2">
              <time class="text-sm text-gray-500" datetime="${post.createdAt}">
                ${this.formatDate(post.createdAt)}
              </time>
              ${this.createDeleteButton(post)}
            </div>
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
   * Criar botão de delete (se aplicável)
   */
  createDeleteButton(post) {
    // Verificar se o usuário pode deletar o post
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (currentUser.id === post.author._id) {
      return `
        <button 
          onclick="if(window.postController) window.postController.deletePost('${post._id}')"
          class="text-red-500 hover:text-red-700 transition-colors p-1"
          title="Deletar post"
        >
          🗑️
        </button>
      `;
    }

    return "";
  }

  /**
   * Estado vazio simplificado
   */
  showEmptyState() {
    if (this.elements.postsContainer) {
      this.elements.postsContainer.innerHTML = `
        <div class="bg-white rounded-lg shadow-sm p-8 text-center">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Nenhum post ainda</h3>
          <p class="text-gray-500">Seja o primeiro a compartilhar algo!</p>
        </div>
      `;
    }
  }

  /**
   * Adicionar post dinamicamente à lista
   */
  prependPost(post) {
    if (!this.elements.postsContainer) return;

    const postElement = this.createPostElement(post);
    this.elements.postsContainer.insertBefore(
      postElement,
      this.elements.postsContainer.firstChild
    );

    // Animação de entrada
    postElement.style.opacity = "0";
    postElement.style.transform = "translateY(-20px)";

    requestAnimationFrame(() => {
      postElement.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      postElement.style.opacity = "1";
      postElement.style.transform = "translateY(0)";
    });
  }

  /**
   * Remover post da lista
   */
  removePost(postId) {
    const postElement = this.elements.postsContainer?.querySelector(
      `[data-post-id="${postId}"]`
    );
    if (postElement) {
      // Animação de saída
      postElement.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      postElement.style.opacity = "0";
      postElement.style.transform = "translateX(100%)";

      setTimeout(() => {
        postElement.remove();

        // Verificar se container ficou vazio
        if (
          this.elements.postsContainer &&
          this.elements.postsContainer.children.length === 0
        ) {
          this.showEmptyState();
        }
      }, 300);
    }
  }

  /**
   * Utilitários para formatação e segurança
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "agora";
    if (diffMins < 60) return `${diffMins}min`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;

    return date.toLocaleDateString("pt-BR");
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}
