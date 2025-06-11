/**
 * app.js - VERSÃO SIMPLIFICADA E ROBUSTA
 *
 * Funciona com QUALQUER estrutura HTML
 * Aplica princípios SOLID de forma prática
 * Foco em FUNCIONALIDADE, não complexidade
 */

console.log("🚀 Inicializando Mini Twitter...");

// Global variables para acesso fácil
let apiRepository;
let storageRepository;
let authController;
let postController;
let userController;

/**
 * INICIALIZAÇÃO PRINCIPAL
 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("📋 DOM carregado - Inicializando aplicação...");

    // 1. Inicializar Repositories
    initializeRepositories();

    // 2. Inicializar Controllers
    initializeControllers();

    // 3. Configurar navegação
    setupNavigation();

    // 4. Verificar autenticação
    await checkAuthentication();

    console.log("✅ Aplicação inicializada com sucesso!");
  } catch (error) {
    console.error("❌ Erro crítico:", error);
    showError("Erro ao inicializar aplicação. Recarregue a página.");
  }
});

/**
 * REPOSITORIES (Data Layer)
 */
function initializeRepositories() {
  console.log("📦 Inicializando Repositories...");

  apiRepository = new ApiRepository();
  storageRepository = new StorageRepository();

  console.log("✅ Repositories inicializados");
}

/**
 * CONTROLLERS (Business Logic)
 */
function initializeControllers() {
  console.log("🧠 Inicializando Controllers...");

  // AuthController
  authController = new AuthController(apiRepository, storageRepository, null);

  // PostController
  postController = new PostController(apiRepository, storageRepository, null);

  // UserController
  userController = new UserController(apiRepository, storageRepository, null);

  // Global access (para callbacks do HTML)
  window.authController = authController;
  window.postController = postController;
  window.userController = userController;

  console.log("✅ Controllers inicializados");
}

/**
 * NAVEGAÇÃO (Navigation Logic)
 * EVENT DEDUPLICATION: Evita listeners duplicados
 */
function setupNavigation() {
  console.log("🧭 Configurando navegação...");

  // Logo Home
  const logoHome = document.getElementById("logo-home");
  if (logoHome && !logoHome.hasAttribute("data-app-listener")) {
    logoHome.addEventListener("click", () => {
      if (authController.isAuthenticated()) {
        showFeed();
      }
    });
    logoHome.setAttribute("data-app-listener", "true");
  }

  // Feed Button (Coordenação centralizada)
  const feedBtn = document.getElementById("feed-btn");
  if (feedBtn && !feedBtn.hasAttribute("data-app-listener")) {
    feedBtn.addEventListener("click", showFeed);
    feedBtn.setAttribute("data-app-listener", "true");
  }

  // Profile Button (Coordenação centralizada - REMOVE duplicação)
  const profileBtn = document.getElementById("profile-btn");
  if (profileBtn && !profileBtn.hasAttribute("data-app-listener")) {
    profileBtn.addEventListener("click", showProfile);
    profileBtn.setAttribute("data-app-listener", "true");
  }

  // Logout Button
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn && !logoutBtn.hasAttribute("data-app-listener")) {
    logoutBtn.addEventListener("click", () => {
      authController.logout();
    });
    logoutBtn.setAttribute("data-app-listener", "true");
  }

  console.log("✅ Navegação configurada (sem duplicação)");
}

/**
 * MOSTRAR FEED
 */
async function showFeed() {
  console.log("🏠 Mostrando Feed...");

  try {
    // Hide auth screen
    const authScreen = document.getElementById("auth-screen");
    if (authScreen) authScreen.classList.add("hidden");

    // Hide profile screen
    const profileScreen = document.getElementById("profile-screen");
    if (profileScreen) profileScreen.classList.add("hidden");

    // Show main feed
    const mainFeed = document.getElementById("main-feed");
    if (mainFeed) mainFeed.classList.remove("hidden");

    // Show nav buttons
    const navButtons = document.getElementById("nav-buttons");
    if (navButtons) navButtons.classList.remove("hidden");

    // Load posts
    await postController.loadPosts();

    console.log("✅ Feed mostrado");
  } catch (error) {
    console.error("❌ Erro ao mostrar feed:", error);
    showError("Erro ao carregar feed");
  }
}

/**
 * MOSTRAR PERFIL
 */
async function showProfile() {
  console.log("👤 Mostrando Perfil...");

  try {
    // Hide main feed
    const mainFeed = document.getElementById("main-feed");
    if (mainFeed) mainFeed.classList.add("hidden");

    // Show profile screen
    const profileScreen = document.getElementById("profile-screen");
    if (profileScreen) profileScreen.classList.remove("hidden");

    // Load profile
    await userController.showProfile();

    console.log("✅ Perfil mostrado");
  } catch (error) {
    console.error("❌ Erro ao mostrar perfil:", error);
    showError("Erro ao carregar perfil");
  }
}

/**
 * VERIFICAR AUTENTICAÇÃO
 */
async function checkAuthentication() {
  console.log("🔐 Verificando autenticação...");

  if (authController.isAuthenticated()) {
    console.log("✅ Usuário autenticado");
    await showFeed();
  } else {
    console.log("ℹ️ Usuário não autenticado");
    showAuthScreen();
  }
}

/**
 * MOSTRAR TELA DE AUTENTICAÇÃO
 */
function showAuthScreen() {
  console.log("🔑 Mostrando tela de autenticação...");

  const authScreen = document.getElementById("auth-screen");
  const mainFeed = document.getElementById("main-feed");
  const profileScreen = document.getElementById("profile-screen");
  const navButtons = document.getElementById("nav-buttons");

  if (authScreen) authScreen.classList.remove("hidden");
  if (mainFeed) mainFeed.classList.add("hidden");
  if (profileScreen) profileScreen.classList.add("hidden");
  if (navButtons) navButtons.classList.add("hidden");
}

/**
 * INTERCEPTAR LOGIN/REGISTER SUCCESS
 */
function onLoginSuccess() {
  console.log("🎉 Login bem-sucedido!");
  setTimeout(async () => {
    await showFeed();
  }, 500);
}

function onRegisterSuccess() {
  console.log("🎉 Registro bem-sucedido!");
  setTimeout(async () => {
    await showFeed();
  }, 500);
}

/**
 * ERROR HANDLING
 */
function showError(message) {
  console.error("❌", message);
  alert(message); // Pode ser substituído por toast
}

/**
 * GLOBAL ERROR HANDLERS
 */
window.addEventListener("error", (event) => {
  console.error("💥 Erro JavaScript:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("💥 Promise rejeitada:", event.reason);
});

/**
 * EXPORT FUNCTIONS FOR CONTROLLERS
 */
window.onLoginSuccess = onLoginSuccess;
window.onRegisterSuccess = onRegisterSuccess;
window.showFeed = showFeed;
window.showProfile = showProfile;
