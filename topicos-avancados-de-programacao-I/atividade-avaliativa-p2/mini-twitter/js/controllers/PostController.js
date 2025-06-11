/**
 * PostController.js - VERSÃO SIMPLIFICADA E ROBUSTA (SOLID + Patterns)
 *
 * Princípios SOLID aplicados:
 * - SRP: Responsável apenas pela lógica de posts
 * - OCP: Extensível para novos tipos de posts
 * - LSP: Pode ser substituído por outras implementações
 * - ISP: Interface específica para posts
 * - DIP: Depende de abstrações (Repositories + Views)
 *
 * Patterns aplicados:
 * - Adapter Pattern: Adaptação para diferentes estruturas HTML
 * - Template Method: Estrutura consistente para operações
 * - Component Pattern: Posts como componentes reutilizáveis
 * - Error Boundary: Tratamento robusto de erros
 * - Defensive Programming: Funciona em qualquer cenário
 */

class PostController {
  constructor(apiRepository, storageRepository, feedView) {
    // Dependency Injection (DIP Principle)
    this.apiRepository = apiRepository;
    this.storageRepository = storageRepository;
    this.feedView = feedView;

    // State Management
    this.isLoading = false;
    this.posts = [];

    // ADAPTER PATTERN: Mapear diferentes IDs para os mesmos elementos
    this.elementMap = {
      // Formulário de post
      postForm: ["post-form", "create-post-form"],
      postTextarea: ["post-textarea", "post-content", "tweet-content"],
      charCounter: ["char-counter", "char-count", "character-count"],

      // Container de posts
      postsContainer: [
        "posts-list",
        "posts-container",
        "feed-posts",
        "tweets-list",
      ],

      // Estados visuais
      loadingPosts: ["loading-posts", "posts-loading"],
      emptyPosts: ["empty-posts", "no-posts"],
    };

    // Error Boundary
    this.initializeWithErrorHandling();

    console.log("📝 PostController SIMPLIFICADO inicializado");
  }

  /**
   * ADAPTER PATTERN - DOM Element Finder
   * Encontra elementos usando múltiplos IDs possíveis
   */
  findElement(elementKey) {
    const possibleIds = this.elementMap[elementKey] || [elementKey];

    for (const id of possibleIds) {
      const element = document.getElementById(id);
      if (element) {
        console.log(`✅ Elemento encontrado: ${id} para ${elementKey}`);
        return element;
      }
    }

    console.warn(`⚠️ Elemento não encontrado para: ${elementKey}`);
    return null;
  }

  /**
   * INITIALIZATION WITH ERROR BOUNDARY
   */
  initializeWithErrorHandling() {
    try {
      this.setupEventListeners();
      console.log("✅ PostController event listeners configurados");
    } catch (error) {
      console.error("❌ Erro na inicialização:", error);
      // Continua funcionando mesmo com erro
    }
  }

  /**
   * EVENT LISTENERS SETUP (DEFENSIVE)
   */
  setupEventListeners() {
    console.log("🔄 Configurando event listeners...");

    // Form de criação de post (DEFENSIVE)
    const postForm = this.findElement("postForm");
    if (postForm && !postForm.hasAttribute("data-post-listener")) {
      postForm.addEventListener("submit", (e) => this.handleCreatePost(e));
      postForm.setAttribute("data-post-listener", "true");
      console.log("✅ Form listener configurado");
    }

    // Textarea para contador de caracteres (DEFENSIVE)
    const postTextarea = this.findElement("postTextarea");
    if (postTextarea && !postTextarea.hasAttribute("data-text-listener")) {
      postTextarea.addEventListener("input", () => this.handleTextChange());
      postTextarea.setAttribute("data-text-listener", "true");
      console.log("✅ Textarea listener configurado");
    }

    console.log("✅ Event listeners configurados");
  }

  /**
   * TEXT CHANGE HANDLER (DEFENSIVE)
   */
  handleTextChange() {
    try {
      const postTextarea = this.findElement("postTextarea");
      const charCounter = this.findElement("charCounter");

      if (!postTextarea) return;

      const currentLength = postTextarea.value.length;
      const remaining = 280 - currentLength;

      // Atualizar contador se existir
      if (charCounter) {
        charCounter.textContent = `${remaining}/280`;

        // Visual Feedback
        if (remaining < 0) {
          charCounter.className = "text-red-500 font-semibold";
        } else if (remaining < 20) {
          charCounter.className = "text-yellow-500 font-semibold";
        } else {
          charCounter.className = "text-gray-500";
        }
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar contador:", error);
    }
  }

  /**
   * CREATE POST HANDLER (ROBUST)
   */
  async handleCreatePost(e) {
    e.preventDefault();

    console.log("📝 Criando novo post...");

    try {
      // Extract content
      const content = this.extractPostContent();

      // Validate
      if (!content) {
        alert("Digite uma mensagem!");
        return;
      }

      if (content.length > 280) {
        alert("Mensagem muito longa! Máximo 280 caracteres.");
        return;
      }

      // Loading state
      this.setLoadingState(true);

      // API Call
      const newPost = await this.apiRepository.createPost(content);
      console.log("✅ Post criado:", newPost);

      // Clear form
      this.clearPostForm();

      // Reload posts to show new one
      await this.loadPosts();

      alert("Post criado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao criar post:", error);
      alert("Erro ao criar post: " + error.message);
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * CONTENT EXTRACTION (DEFENSIVE)
   */
  extractPostContent() {
    const postTextarea = this.findElement("postTextarea");
    return postTextarea?.value?.trim() || "";
  }

  /**
   * CLEAR FORM (DEFENSIVE)
   */
  clearPostForm() {
    const postTextarea = this.findElement("postTextarea");
    if (postTextarea) {
      postTextarea.value = "";
      this.handleTextChange(); // Atualizar contador
    }
  }

  /**
   * LOADING STATE (DEFENSIVE)
   */
  setLoadingState(isLoading) {
    this.isLoading = isLoading;

    const postForm = this.findElement("postForm");
    const submitBtn = postForm?.querySelector('button[type="submit"]');

    if (submitBtn) {
      submitBtn.disabled = isLoading;
      submitBtn.textContent = isLoading ? "Publicando..." : "Publicar";
    }
  }

  /**
   * LOAD POSTS - MÉTODO PRINCIPAL (ROBUST)
   */
  async loadPosts() {
    if (this.isLoading) {
      console.log("⏳ Carregamento já em andamento...");
      return;
    }

    console.log("🔄 Carregando posts...");

    try {
      this.setLoadingState(true);
      this.showLoadingState();

      // API Call
      const posts = await this.apiRepository.getPosts();
      console.log(`✅ ${posts.length} posts carregados`);

      // Process and sort
      const sortedPosts = this.processPosts(posts);

      // Cache
      this.posts = sortedPosts;

      // Render
      this.renderPosts(sortedPosts);

      console.log("✅ Posts renderizados com sucesso");
    } catch (error) {
      console.error("❌ Erro ao carregar posts:", error);
      this.showErrorState("Erro ao carregar posts: " + error.message);
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * PROCESS POSTS (DATA TRANSFORMATION)
   */
  processPosts(posts) {
    if (!Array.isArray(posts)) {
      console.warn("⚠️ Posts não são array:", posts);
      return [];
    }

    // Ordenação por data (mais recentes primeiro)
    return posts.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Decrescente
    });
  }

  /**
   * RENDER POSTS (ADAPTER PATTERN)
   */
  renderPosts(posts) {
    console.log(`🎨 Renderizando ${posts.length} posts...`);

    // ADAPTER: Encontrar container de posts
    const container = this.findElement("postsContainer");

    if (!container) {
      console.error("❌ Container de posts não encontrado!");
      return;
    }

    // Hide loading/empty states
    this.hideStates();

    // Clear container
    container.innerHTML = "";

    // Empty state
    if (posts.length === 0) {
      this.showEmptyState(container);
      return;
    }

    // Render each post
    posts.forEach((post) => {
      const postElement = this.createPostComponent(post);
      container.appendChild(postElement);
    });

    console.log("✅ Posts renderizados");
  }

  /**
   * CREATE POST COMPONENT (COMPONENT FACTORY)
   */
  createPostComponent(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "post-item fade-in";
    postDiv.dataset.postId = post._id;

    const currentUser = this.storageRepository.getUser();
    const isMyPost = currentUser && post.author._id === currentUser.id;
    const formattedDate = this.formatPostDate(post.createdAt);
    const avatarLetter = post.author.username.charAt(0).toUpperCase();

    postDiv.innerHTML = `
      <div class="post-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div style="
            width: 40px; height: 40px; 
            background: #3b82f6; color: white; 
            border-radius: 50%; 
            display: flex; align-items: center; justify-content: center;
            font-weight: bold;
          ">
            ${avatarLetter}
          </div>
          <div>
            <div class="post-author">@${this.escapeHtml(
              post.author.username
            )}</div>
            <div class="post-date">${formattedDate}</div>
          </div>
        </div>
        ${
          isMyPost
            ? `
          <button 
            onclick="postController.deletePost('${post._id}')"
            class="delete-btn"
            style="cursor: pointer;"
            title="Deletar post"
            aria-label="Deletar este post permanentemente"
          >
            🗑️ Deletar
          </button>
        `
            : ""
        }
      </div>
      <div class="post-content">${this.escapeHtml(post.content)}</div>
    `;

    return postDiv;
  }

  /**
   * UI STATES (DEFENSIVE)
   */
  showLoadingState() {
    const container = this.findElement("postsContainer");
    if (container) {
      container.innerHTML = `
        <div style="
          background: white; padding: 2rem; 
          border-radius: 8px; text-align: center;
        ">
          <div style="
            width: 32px; height: 32px; 
            border: 3px solid #f3f3f3; 
            border-top: 3px solid #3b82f6; 
            border-radius: 50%; 
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem auto;
          "></div>
          <p style="color: #6b7280;">Carregando posts...</p>
        </div>
      `;
    }
  }

  showEmptyState(container) {
    container.innerHTML = `
      <div style="
        background: white; padding: 2rem; 
        border-radius: 8px; text-align: center;
      ">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📝</div>
        <h3 style="font-size: 1.125rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">
          Nenhum post ainda
        </h3>
        <p style="color: #6b7280;">Seja o primeiro a compartilhar algo!</p>
      </div>
    `;
  }

  showErrorState(message) {
    const container = this.findElement("postsContainer");
    if (container) {
      container.innerHTML = `
        <div style="
          background: #fef2f2; border: 1px solid #fecaca; 
          padding: 1.5rem; border-radius: 8px; text-align: center;
        ">
          <div style="font-size: 2rem; margin-bottom: 1rem;">⚠️</div>
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #dc2626; margin-bottom: 1rem;">
            Erro ao carregar posts
          </h3>
          <p style="color: #dc2626; margin-bottom: 1rem;">${message}</p>
          <button 
            onclick="postController.loadPosts()" 
            style="
              background: #dc2626; color: white; 
              padding: 0.5rem 1rem; border: none; 
              border-radius: 4px; cursor: pointer;
            "
            aria-label="Tentar carregar posts novamente"
          >
            🔄 Tentar novamente
          </button>
        </div>
      `;
    }
  }

  hideStates() {
    // Hide loading
    const loadingEl = this.findElement("loadingPosts");
    if (loadingEl) loadingEl.classList.add("hidden");

    // Hide empty
    const emptyEl = this.findElement("emptyPosts");
    if (emptyEl) emptyEl.classList.add("hidden");
  }

  /**
   * DELETE POST (COMMAND PATTERN)
   */
  async deletePost(postId) {
    if (!confirm("Tem certeza que deseja excluir esta postagem?")) return;

    console.log("🗑️ Deletando post:", postId);

    try {
      await this.apiRepository.deletePost(postId);

      // Remove from cache
      this.posts = this.posts.filter((post) => post._id !== postId);

      // Remove from UI
      const postElement = document.querySelector(`[data-post-id="${postId}"]`);
      if (postElement) {
        postElement.remove();
      }

      // Check if empty
      const container = this.findElement("postsContainer");
      if (container && container.children.length === 0) {
        this.showEmptyState(container);
      }

      console.log("✅ Post deletado");
      alert("Post excluído com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao deletar:", error);
      alert("Erro ao excluir post: " + error.message);
    }
  }

  /**
   * UTILITY METHODS
   */
  formatPostDate(dateString) {
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

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * LIFECYCLE METHODS
   */
  onUserLoggedIn() {
    console.log("📢 Usuário logado - carregando posts");
    this.loadPosts();
  }

  onUserLoggedOut() {
    console.log("📢 Usuário deslogado - limpando posts");
    this.posts = [];
    const container = this.findElement("postsContainer");
    if (container) container.innerHTML = "";
  }
}
