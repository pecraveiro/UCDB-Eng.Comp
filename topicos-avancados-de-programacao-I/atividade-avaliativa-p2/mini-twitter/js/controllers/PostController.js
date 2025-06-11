// PostController.js - Controle de postagens
class PostController {
  constructor(apiRepository, storageRepository) {
    this.apiRepository = apiRepository;
    this.storageRepository = storageRepository;
    this.initializeEvents();
  }

  initializeEvents() {
    // Form de nova postagem
    const postForm = document.getElementById("post-form");
    postForm.addEventListener("submit", (e) => this.handleCreatePost(e));

    // Contador de caracteres
    const postContent = document.getElementById("post-content");
    postContent.addEventListener("input", () => this.updateCharCount());
  }

  async handleCreatePost(e) {
    e.preventDefault();

    const content = document.getElementById("post-content").value.trim();

    if (!content) {
      alert("Digite uma mensagem!");
      return;
    }

    if (content.length > 280) {
      alert("Mensagem muito longa! Máximo 280 caracteres.");
      return;
    }

    try {
      await this.apiRepository.createPost(content);
      document.getElementById("post-content").value = "";
      this.updateCharCount();
      this.loadPosts();
      alert("Postagem criada com sucesso!");
    } catch (error) {
      alert("Erro ao criar postagem: " + error.message);
    }
  }

  updateCharCount() {
    const postContent = document.getElementById("post-content");
    const charCount = document.getElementById("char-count");
    const currentLength = postContent.value.length;

    charCount.textContent = `${currentLength}/280`;

    if (currentLength > 280) {
      charCount.style.color = "#ef4444";
    } else if (currentLength > 250) {
      charCount.style.color = "#f59e0b";
    } else {
      charCount.style.color = "#6b7280";
    }
  }

  async loadPosts() {
    try {
      const posts = await this.apiRepository.getPosts();
      this.displayPosts(posts);
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    }
  }

  async loadMyPosts() {
    try {
      const posts = await this.apiRepository.getMyPosts();
      this.displayMyPosts(posts);
    } catch (error) {
      console.error("Erro ao carregar meus posts:", error);
    }
  }

  displayPosts(posts) {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    if (posts.length === 0) {
      container.innerHTML =
        '<p class="text-gray-500 text-center py-8">Nenhuma postagem encontrada.</p>';
      return;
    }

    // Ordenar por data (mais recentes primeiro)
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    posts.forEach((post) => {
      const postElement = this.createPostElement(post);
      container.appendChild(postElement);
    });
  }

  displayMyPosts(posts) {
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
      const postElement = this.createPostElement(post, true); // true = allow delete
      container.appendChild(postElement);
    });
  }

  createPostElement(post, allowDelete = false) {
    const postDiv = document.createElement("div");
    postDiv.className = "post-item fade-in";

    const currentUser = this.storageRepository.getUser();
    const isMyPost = currentUser && post.author._id === currentUser.id;

    postDiv.innerHTML = `
      <div class="post-header">
        <span class="post-author">@${post.author.username}</span>
        <span class="post-date">${this.formatDate(post.createdAt)}</span>
      </div>
      <div class="post-content">${post.content}</div>
      ${
        allowDelete || isMyPost
          ? `
        <div class="post-actions">
          <button class="delete-btn" onclick="postController.deletePost('${post._id}')">
            Excluir
          </button>
        </div>
      `
          : ""
      }
    `;

    return postDiv;
  }

  async deletePost(postId) {
    if (!confirm("Tem certeza que deseja excluir esta postagem?")) {
      return;
    }

    try {
      await this.apiRepository.deletePost(postId);
      this.loadPosts();
      this.loadMyPosts();
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
