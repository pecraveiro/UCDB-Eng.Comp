// app.js - Inicialização da aplicação
class App {
  constructor() {
    this.init();
  }

  async init() {
    // Inicializar repositórios
    this.apiRepository = new ApiRepository();
    this.storageRepository = new StorageRepository();

    // Inicializar controllers
    this.authController = new AuthController(
      this.apiRepository,
      this.storageRepository
    );
    this.postController = new PostController(
      this.apiRepository,
      this.storageRepository
    );
    this.userController = new UserController(
      this.apiRepository,
      this.storageRepository
    );

    // Tornar controllers globais para callbacks de botões
    window.authController = this.authController;
    window.postController = this.postController;
    window.userController = this.userController;

    // Verificar se usuário já está logado
    if (this.authController.checkAuthStatus()) {
      await this.loadInitialData();
    }
  }

  async loadInitialData() {
    try {
      await this.postController.loadPosts();
    } catch (error) {
      console.error("Erro ao carregar dados iniciais:", error);
    }
  }
}

// Inicializar app quando DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
