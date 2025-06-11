/**
 * UserController.js - VERSÃO SIMPLIFICADA E ROBUSTA (SOLID + Patterns)
 *
 * Princípios SOLID aplicados:
 * - SRP: Responsável apenas pela lógica de usuário/perfil
 * - OCP: Extensível para novos tipos de perfil
 * - LSP: Pode ser substituído por outras implementações
 * - ISP: Interface específica para operações de usuário
 * - DIP: Depende de abstrações (Repositories + Views)
 *
 * Patterns aplicados:
 * - Adapter Pattern: Adaptação para diferentes estruturas HTML
 * - State Pattern: Gerenciamento de estados do perfil
 * - Template Method: Estrutura consistente para operações
 * - Error Boundary: Tratamento robusto de erros
 * - Defensive Programming: Funciona em qualquer cenário
 */

class UserController {
  constructor(apiRepository, storageRepository, profileView) {
    // Dependency Injection (DIP Principle)
    this.apiRepository = apiRepository;
    this.storageRepository = storageRepository;
    this.profileView = profileView;

    // State Management
    this.isLoading = false;
    this.isLoadingProfile = false; // DEBOUNCE FLAG - Evita chamadas duplicadas
    this.profileData = null;
    this.userPosts = [];

    // ADAPTER PATTERN: Mapear diferentes IDs para os mesmos elementos
    this.elementMap = {
      // Navegação
      profileBtn: ["profile-btn", "nav-profile"],
      backToFeedBtn: ["back-to-feed", "feed-btn"],

      // Telas
      profileScreen: ["profile-screen", "profile-page"],
      mainFeed: ["main-feed", "feed-screen"],

      // Dados do perfil
      profileUsername: ["profile-username", "user-name"],
      profileEmail: ["profile-email", "user-email"],
      profileJoinDate: ["profile-join-date", "join-date"],

      // Edição
      editProfileBtn: ["edit-profile-btn", "edit-btn"],
      editProfileForm: ["edit-profile-form", "profile-edit"],
      editUsername: ["edit-username", "input-username"],
      editEmail: ["edit-email", "input-email"],
      saveProfileBtn: ["save-profile-btn", "save-btn"],
      cancelEditBtn: ["cancel-edit-btn", "cancel-btn"],

      // Posts do usuário
      userPostsList: ["user-posts-list", "my-posts", "profile-posts"],
      noUserPosts: ["no-user-posts", "empty-posts"],
    };

    // Error Boundary
    this.initializeWithErrorHandling();

    console.log("👤 UserController SIMPLIFICADO inicializado");
  }

  /**
   * ADAPTER PATTERN - DOM Element Finder
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
      console.log("✅ UserController event listeners configurados");
    } catch (error) {
      console.error("❌ Erro na inicialização:", error);
      // Continua funcionando mesmo com erro
    }
  }

  /**
   * EVENT LISTENERS SETUP (DEFENSIVE)
   * REMOVE DUPLICAÇÃO: Profile button é gerenciado pelo app.js
   */
  setupEventListeners() {
    console.log("🔄 Configurando event listeners...");

    // REMOVIDO: Profile Button (gerenciado pelo app.js para evitar duplicação)
    // const profileBtn = this.findElement('profileBtn');
    // if (profileBtn && !profileBtn.hasAttribute('data-profile-listener')) {
    //   profileBtn.addEventListener('click', () => this.showProfile());
    //   profileBtn.setAttribute('data-profile-listener', 'true');
    //   console.log('✅ Profile button listener configurado');
    // }

    // Botão voltar ao feed (DEFENSIVE)
    const backBtn = this.findElement("backToFeedBtn");
    if (backBtn && !backBtn.hasAttribute("data-back-listener")) {
      backBtn.addEventListener("click", () => this.backToFeed());
      backBtn.setAttribute("data-back-listener", "true");
      console.log("✅ Back button listener configurado");
    }

    // Botão editar perfil (DEFENSIVE)
    const editBtn = this.findElement("editProfileBtn");
    if (editBtn && !editBtn.hasAttribute("data-edit-listener")) {
      editBtn.addEventListener("click", () => this.showEditForm());
      editBtn.setAttribute("data-edit-listener", "true");
      console.log("✅ Edit button listener configurado");
    }

    // Botão salvar (DEFENSIVE)
    const saveBtn = this.findElement("saveProfileBtn");
    if (saveBtn && !saveBtn.hasAttribute("data-save-listener")) {
      saveBtn.addEventListener("click", () => this.saveProfile());
      saveBtn.setAttribute("data-save-listener", "true");
      console.log("✅ Save button listener configurado");
    }

    // Botão cancelar (DEFENSIVE)
    const cancelBtn = this.findElement("cancelEditBtn");
    if (cancelBtn && !cancelBtn.hasAttribute("data-cancel-listener")) {
      cancelBtn.addEventListener("click", () => this.cancelEdit());
      cancelBtn.setAttribute("data-cancel-listener", "true");
      console.log("✅ Cancel button listener configurado");
    }

    console.log("✅ Event listeners configurados (sem duplicação)");
  }

  /**
   * SHOW PROFILE (MAIN METHOD)
   * DEBOUNCE PATTERN: Evita chamadas duplicadas
   */
  async showProfile() {
    // DEBOUNCE: Verificar se já está carregando
    if (this.isLoadingProfile) {
      console.log(
        "⏳ Perfil já está carregando, ignorando chamada duplicada..."
      );
      return;
    }

    console.log("👤 Mostrando perfil...");

    try {
      // SET LOADING FLAG (Debounce Pattern)
      this.isLoadingProfile = true;

      // Show profile screen
      this.showProfileUI();

      // Load profile data
      await this.loadProfileData();

      // Load user posts
      await this.loadUserPosts();

      console.log("✅ Perfil carregado com sucesso");
    } catch (error) {
      console.error("❌ Erro ao mostrar perfil:", error);
      alert("Erro ao carregar perfil: " + error.message);
    } finally {
      // RESET LOADING FLAG (Debounce Pattern)
      this.isLoadingProfile = false;
    }
  }

  /**
   * UI NAVIGATION (DEFENSIVE)
   */
  showProfileUI() {
    // Hide feed
    const mainFeed = this.findElement("mainFeed");
    if (mainFeed) mainFeed.classList.add("hidden");

    // Show profile
    const profileScreen = this.findElement("profileScreen");
    if (profileScreen) {
      profileScreen.classList.remove("hidden");
      console.log("✅ Profile screen mostrada");
    }
  }

  backToFeed() {
    console.log("🏠 Voltando ao feed...");

    // Hide profile
    const profileScreen = this.findElement("profileScreen");
    if (profileScreen) profileScreen.classList.add("hidden");

    // Show feed
    const mainFeed = this.findElement("mainFeed");
    if (mainFeed) {
      mainFeed.classList.remove("hidden");
      console.log("✅ Feed mostrado");
    }

    // Reload posts if available
    if (window.postController?.loadPosts) {
      window.postController.loadPosts();
    }
  }

  /**
   * LOAD PROFILE DATA (ROBUST)
   */
  async loadProfileData() {
    console.log("📋 Carregando dados do perfil...");

    try {
      this.isLoading = true;

      // API Call
      const profileData = await this.apiRepository.getUserProfile();
      console.log("✅ Dados do perfil carregados:", profileData);

      // Cache data
      this.profileData = profileData;

      // Render profile data
      this.renderProfileData(profileData);
    } catch (error) {
      console.error("❌ Erro ao carregar dados do perfil:", error);
      throw new Error("Falha ao carregar dados do perfil");
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * RENDER PROFILE DATA (DEFENSIVE)
   */
  renderProfileData(profileData) {
    console.log("🎨 Renderizando dados do perfil...");

    // Username
    const usernameEl = this.findElement("profileUsername");
    if (usernameEl && profileData.username) {
      usernameEl.textContent = `@${profileData.username}`;
    }

    // Email
    const emailEl = this.findElement("profileEmail");
    if (emailEl && profileData.email) {
      emailEl.textContent = profileData.email;
    }

    // Join date
    const joinDateEl = this.findElement("profileJoinDate");
    if (joinDateEl && profileData.createdAt) {
      const joinDate = new Date(profileData.createdAt);
      joinDateEl.textContent = `Membro desde ${joinDate.toLocaleDateString(
        "pt-BR",
        {
          month: "long",
          year: "numeric",
        }
      )}`;
    }

    // Update avatar letter
    const avatarEl = document.querySelector("#profile-info .bg-blue-500");
    if (avatarEl && profileData.username) {
      avatarEl.textContent = profileData.username.charAt(0).toUpperCase();
    }

    console.log("✅ Dados do perfil renderizados");
  }

  /**
   * LOAD USER POSTS (ROBUST)
   */
  async loadUserPosts() {
    console.log("📝 Carregando posts do usuário...");

    try {
      // API Call
      const userPosts = await this.apiRepository.getMyPosts();
      console.log(`✅ ${userPosts.length} posts do usuário carregados`);

      // Process and sort
      const sortedPosts = this.processUserPosts(userPosts);

      // Cache
      this.userPosts = sortedPosts;

      // Render
      this.renderUserPosts(sortedPosts);
    } catch (error) {
      console.error("❌ Erro ao carregar posts do usuário:", error);
      throw new Error("Falha ao carregar posts do usuário");
    }
  }

  /**
   * PROCESS USER POSTS (DATA TRANSFORMATION)
   */
  processUserPosts(posts) {
    if (!Array.isArray(posts)) {
      console.warn("⚠️ Posts do usuário não são array:", posts);
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
   * RENDER USER POSTS (COMPONENT PATTERN)
   */
  renderUserPosts(posts) {
    console.log(`🎨 Renderizando ${posts.length} posts do usuário...`);

    const container = this.findElement("userPostsList");
    if (!container) {
      console.error("❌ Container de posts do usuário não encontrado");
      return;
    }

    // Clear container
    container.innerHTML = "";

    // Empty state
    if (posts.length === 0) {
      this.showEmptyUserPosts(container);
      return;
    }

    // Render each post
    posts.forEach((post) => {
      const postElement = this.createUserPostComponent(post);
      container.appendChild(postElement);
    });

    console.log("✅ Posts do usuário renderizados");
  }

  /**
   * CREATE USER POST COMPONENT (COMPONENT FACTORY)
   * Design System: Utilizando classes CSS otimizadas
   */
  createUserPostComponent(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "user-post-item";
    postDiv.dataset.postId = post._id;

    const formattedDate = this.formatPostDate(post.createdAt);

    postDiv.innerHTML = `
      <div class="user-post-header">
        <time class="user-post-date">${formattedDate}</time>
        <button 
          onclick="userController.deleteUserPost('${post._id}')"
          class="user-post-delete-btn"
          title="Deletar post"
          aria-label="Deletar este post permanentemente"
        >
          🗑️ Deletar
        </button>
      </div>
      <div class="user-post-text">
        ${this.escapeHtml(post.content)}
      </div>
    `;

    return postDiv;
  }

  /**
   * EMPTY STATE FOR USER POSTS
   * Design System: Utilizando classes CSS otimizadas
   */
  showEmptyUserPosts(container) {
    container.innerHTML = `
      <div class="empty-state-container">
        <div class="empty-state-icon">📝</div>
        <h4 class="empty-state-title">
          Nenhuma publicação ainda
        </h4>
        <p class="empty-state-description">
          Compartilhe seus primeiros pensamentos no feed!
        </p>
        <button 
          onclick="userController.backToFeed()" 
          class="empty-state-cta"
          aria-label="Ir para o feed para criar primeiro post"
        >
          ✍️ Criar primeiro post
        </button>
      </div>
    `;
  }

  /**
   * DELETE USER POST (COMMAND PATTERN)
   */
  async deleteUserPost(postId) {
    if (!confirm("Tem certeza que deseja excluir esta postagem?")) return;

    console.log("🗑️ Deletando post do usuário:", postId);

    try {
      await this.apiRepository.deletePost(postId);

      // Remove from cache
      this.userPosts = this.userPosts.filter((post) => post._id !== postId);

      // Remove from UI
      const postElement = document.querySelector(`[data-post-id="${postId}"]`);
      if (postElement) {
        postElement.remove();
      }

      // Check if empty
      const container = this.findElement("userPostsList");
      if (container && container.children.length === 0) {
        this.showEmptyUserPosts(container);
      }

      // Also update feed if necessary
      if (window.postController?.loadPosts) {
        window.postController.loadPosts();
      }

      console.log("✅ Post do usuário deletado");
      alert("Post excluído com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao deletar post:", error);
      alert("Erro ao excluir post: " + error.message);
    }
  }

  /**
   * PROFILE EDITING (FORM MANAGEMENT)
   */
  showEditForm() {
    console.log("✏️ Mostrando formulário de edição...");

    // Hide profile info
    const profileInfo = document.getElementById("profile-info");
    if (profileInfo) profileInfo.classList.add("hidden");

    // Show edit form
    const editForm = this.findElement("editProfileForm");
    if (editForm) {
      editForm.classList.remove("hidden");

      // Populate form with current data
      if (this.profileData) {
        const usernameInput = this.findElement("editUsername");
        const emailInput = this.findElement("editEmail");

        if (usernameInput)
          usernameInput.value = this.profileData.username || "";
        if (emailInput) emailInput.value = this.profileData.email || "";
      }
    }
  }

  async saveProfile() {
    console.log("💾 Salvando perfil...");

    try {
      // Extract form data
      const usernameInput = this.findElement("editUsername");
      const emailInput = this.findElement("editEmail");

      const username = usernameInput?.value?.trim() || "";
      const email = emailInput?.value?.trim() || "";

      // Validate
      if (!username || username.length < 3) {
        alert("Nome de usuário deve ter pelo menos 3 caracteres");
        return;
      }

      if (!email || !this.isValidEmail(email)) {
        alert("Email deve ter formato válido");
        return;
      }

      // API Call
      const response = await this.apiRepository.updateUserProfile(
        username,
        email
      );
      console.log("✅ Perfil atualizado:", response);

      // Update storage
      if (response.user) {
        this.storageRepository.saveUser(response.user);
        this.profileData = response.user;
      }

      // Update UI
      this.renderProfileData(this.profileData);
      this.cancelEdit();

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao salvar perfil:", error);
      alert("Erro ao atualizar perfil: " + error.message);
    }
  }

  cancelEdit() {
    console.log("❌ Cancelando edição...");

    // Hide edit form
    const editForm = this.findElement("editProfileForm");
    if (editForm) editForm.classList.add("hidden");

    // Show profile info
    const profileInfo = document.getElementById("profile-info");
    if (profileInfo) profileInfo.classList.remove("hidden");
  }

  /**
   * UTILITY METHODS
   */
  formatPostDate(dateString) {
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

  /**
   * LIFECYCLE METHODS
   */
  onUserLoggedIn() {
    console.log("📢 Usuário logado - UserController ativo");
  }

  onUserLoggedOut() {
    console.log("📢 Usuário deslogado - limpando dados");
    this.profileData = null;
    this.userPosts = [];
  }
}
