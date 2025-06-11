// UserController.js - Controle de usuário
class UserController {
  constructor(apiRepository, storageRepository) {
    this.apiRepository = apiRepository;
    this.storageRepository = storageRepository;
    this.initializeEvents();
  }

  initializeEvents() {
    // Botão para ir ao perfil
    document
      .getElementById("profile-btn")
      .addEventListener("click", () => this.showProfile());

    // Botão para voltar ao feed
    document
      .getElementById("back-to-feed")
      .addEventListener("click", () => this.backToFeed());

    // Form de atualização do perfil
    const profileForm = document.getElementById("profile-form");
    profileForm.addEventListener("submit", (e) => this.handleUpdateProfile(e));
  }

  async showProfile() {
    document.getElementById("main-feed").classList.add("hidden");
    document.getElementById("profile-screen").classList.remove("hidden");

    // Atualizar visual dos botões da navbar
    if (window.authController) {
      window.authController.updateNavButtons("profile");
    }

    await this.loadProfileData();
    await this.loadUserPosts();
  }

  backToFeed() {
    document.getElementById("profile-screen").classList.add("hidden");
    document.getElementById("main-feed").classList.remove("hidden");

    // Atualizar visual dos botões da navbar
    if (window.authController) {
      window.authController.updateNavButtons("feed");
    }
  }

  async loadProfileData() {
    try {
      const profile = await this.apiRepository.getUserProfile();

      // Preencher os campos do formulário
      document.getElementById("profile-username").value = profile.username;
      document.getElementById("profile-email").value = profile.email;
    } catch (error) {
      alert("Erro ao carregar perfil: " + error.message);
    }
  }

  async loadUserPosts() {
    try {
      const posts = await this.apiRepository.getMyPosts();
      this.displayUserPosts(posts);
    } catch (error) {
      console.error("Erro ao carregar posts do usuário:", error);
    }
  }

  displayUserPosts(posts) {
    const container = document.getElementById("my-posts-container");
    container.innerHTML = "";

    if (posts.length === 0) {
      container.innerHTML =
        '<p class="text-gray-500 text-center py-8">Você ainda não fez nenhuma postagem.</p>';
      return;
    }

    // Ordenar por data (mais recentes primeiro)
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    posts.forEach((post) => {
      const postElement = this.createPostElement(post);
      container.appendChild(postElement);
    });
  }

  createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "post-item fade-in";

    postDiv.innerHTML = `
            <div class="post-header">
                <span class="post-author">@${post.author.username}</span>
                <span class="post-date">${this.formatDate(
                  post.createdAt
                )}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <button class="delete-btn" onclick="userController.deletePost('${
                  post._id
                }')">
                    Excluir
                </button>
            </div>
        `;

    return postDiv;
  }

  async handleUpdateProfile(e) {
    e.preventDefault();

    const username = document.getElementById("profile-username").value.trim();
    const email = document.getElementById("profile-email").value.trim();

    if (!username || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await this.apiRepository.updateUserProfile(
        username,
        email
      );

      // Atualizar dados locais
      const updatedUser = response.user;
      this.storageRepository.saveUser(updatedUser);

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar perfil: " + error.message);
    }
  }

  async deletePost(postId) {
    if (!confirm("Tem certeza que deseja excluir esta postagem?")) {
      return;
    }

    try {
      await this.apiRepository.deletePost(postId);
      this.loadUserPosts();
      alert("Postagem excluída com sucesso!");
    } catch (error) {
      alert("Erro ao excluir postagem: " + error.message);
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("pt-BR") +
      " às " +
      date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }
}
