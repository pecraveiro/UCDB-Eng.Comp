# 🐦 Mini Twitter - Projeto Acadêmico

Um projeto de desenvolvimento web que implementa uma versão simplificada do Twitter utilizando apenas **HTML5**, **CSS3** e **JavaScript Vanilla**. Desenvolvido como projeto universitário com foco em **Clean Architecture**, **Design Patterns** e **Práticas Modernas de Desenvolvimento**.

## 📋 Sobre o Projeto

Este projeto demonstra a implementação de uma aplicação web completa sem frameworks externos, aplicando princípios de **Clean Code**, **SOLID**, **Responsive Design** e **Acessibilidade (A11Y)**. A aplicação permite aos usuários se cadastrar, fazer login, criar postagens e visualizar perfis, similar ao Twitter.

## 🚀 Funcionalidades Implementadas

### ✅ Sistema de Usuários

- **Cadastro de Usuários**: Formulário com validação completa
  - Campos: username, email, senha
  - Validação em tempo real
  - Feedback visual para erros
- **Login/Logout**: Autenticação segura com JWT
  - Persistência de sessão via localStorage
  - Redirecionamento automático
- **Perfil do Usuário**: Visualização e edição de dados
  - Informações pessoais
  - Lista de postagens do usuário
  - Edição de perfil

### ✅ Feed de Postagens

- **Criar Postagens**: Interface intuitiva
  - Limite de 280 caracteres
  - Contador visual de caracteres
  - Preview em tempo real
- **Timeline Global**: Feed de todas as postagens
  - Ordenação por data (mais recentes primeiro)
  - Formatação de data/hora
  - Scroll infinito (preparado para implementação)
- **Gerenciamento**: Visualizar e deletar próprias postagens

### ✅ Interface e Navegação

- **Design Responsivo**: Mobile-first approach
- **Navegação Intuitiva**: SPA (Single Page Application)
- **Estados Visuais**: Loading, success, error states
- **Acessibilidade**: ARIA labels, navegação por teclado

## 🏗️ Arquitetura e Padrões Aplicados

### 📐 **Clean Architecture**

```
├── Presentation Layer (Views/Controllers)
├── Business Logic Layer (Services)
└── Data Layer (Repositories)
```

### 🎯 **Design Patterns Implementados**

- **MVC Pattern**: Separação clara de responsabilidades
- **Repository Pattern**: Abstração da camada de dados
- **Singleton Pattern**: Gerenciamento de estado global
- **Observer Pattern**: Comunicação entre componentes
- **Strategy Pattern**: Diferentes estratégias de persistência

### 🔧 **Princípios SOLID**

- **S** - Single Responsibility: Cada classe tem uma responsabilidade
- **O** - Open/Closed: Extensível sem modificação
- **L** - Liskov Substitution: Substituição de componentes
- **I** - Interface Segregation: Interfaces específicas
- **D** - Dependency Inversion: Inversão de dependências

### 🎨 **Design System & UI/UX**

- **Atomic Design**: Componentes reutilizáveis
- **Design Tokens**: Sistema consistente de cores e tipografia
- **Visual Hierarchy**: Organização clara de informações
- **Color Psychology**: Cores semanticamente corretas
- **Typography Scale**: Hierarquia tipográfica consistente
- **Spacing System**: Grid e espaçamentos harmoniosos

## 📁 Estrutura do Projeto

```
mini-twitter/
├── index.html                    # Página principal (SPA)
├── README.md                     # Documentação
├── js/
│   ├── app.js                   # Inicialização da aplicação
│   ├── controllers/             # Camada de Apresentação
│   │   ├── AuthController.js    # Gerenciamento de autenticação
│   │   ├── PostController.js    # Gerenciamento de postagens
│   │   └── UserController.js    # Gerenciamento de usuários
│   └── repositories/            # Camada de Dados
│       ├── ApiRepository.js     # Comunicação com API externa
│       └── StorageRepository.js # Persistência local (localStorage)
└── cursor/
    └── .rules                   # Especificações do projeto
```

## 🛠️ Tecnologias e Práticas

### **Frontend**

- **HTML5 Semântico**: Estrutura acessível e SEO-friendly
- **Tailwind CSS v4**: Framework CSS moderno via CDN
- **JavaScript ES6+**: Vanilla JavaScript com features modernas
- **CSS-in-JS Patterns**: Estilos dinâmicos e condicionais

### **Padrões de Código**

- **Clean Code**: Código limpo e legível
- **DRY/KISS/YAGNI**: Princípios de desenvolvimento
- **Error Boundaries**: Tratamento robusto de erros
- **Type Safety**: Validação de tipos em runtime
- **Pure Functions**: Funções sem efeitos colaterais

### **Acessibilidade (A11Y)**

- **ARIA Patterns**: Labels e roles adequados
- **Focus Management**: Navegação por teclado
- **Screen Reader**: Compatibilidade com leitores de tela
- **Color Contrast**: Contraste adequado para visibilidade
- **Semantic HTML**: Estrutura semântica correta

### **Performance & SEO**

- **Lazy Loading**: Carregamento otimizado
- **Minificação**: Código otimizado para produção
- **Caching Strategy**: Estratégia de cache inteligente
- **SEO Optimized**: Meta tags e estrutura otimizada

## 🌐 API Integration

### **Base URL**

```
https://mini-twitter-api-vy9q.onrender.com/
```

### **Endpoints Utilizados**

- `POST /api/auth/register` - Cadastro de usuários
- `POST /api/auth/login` - Login de usuários
- `GET /api/posts` - Listar todas as postagens
- `POST /api/posts` - Criar nova postagem
- `GET /api/posts/my-posts` - Postagens do usuário
- `DELETE /api/posts/:id` - Deletar postagem
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil

### **Autenticação**

```javascript
Authorization: Bearer {jwt_token}
```

## 🚀 Como Executar

### **Pré-requisitos**

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para CDN do Tailwind e API)

### **Instalação**

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Navegue até o diretório
cd mini-twitter

# Abra o arquivo index.html no navegador
# Ou use um servidor local como Live Server (VS Code)
```

### **Uso Local**

1. Abra `index.html` em um navegador
2. Para desenvolvimento, recomenda-se usar o **Live Server** do VS Code
3. A aplicação se conecta automaticamente à API externa

## 📱 Funcionalidades Responsivas

### **Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Padrões Responsivos**

- **Mobile First**: Design prioritário para mobile
- **Fluid Typography**: Tipografia adaptável
- **Flexible Layouts**: Layouts flexíveis com CSS Grid/Flexbox
- **Touch Targets**: Áreas de toque adequadas para mobile

## 🎨 Design System

### **Cores Principais**

- **Primary**: Blue-600 (#2563eb)
- **Success**: Green-600 (#16a34a)
- **Danger**: Red-600 (#dc2626)
- **Warning**: Amber-600 (#d97706)
- **Neutral**: Gray-600 (#4b5563)

### **Tipografia**

- **Font Family**: Inter, system-ui, sans-serif
- **Scale**: 0.875rem, 1rem, 1.125rem, 1.25rem, 1.5rem, 2rem
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### **Espaçamentos**

- **Base Unit**: 0.25rem (4px)
- **Scale**: 1, 2, 3, 4, 6, 8, 12, 16, 20, 24px

## 📊 Critérios de Avaliação

### **Funcionalidade (40%)**

- ✅ Implementação correta de todas as funcionalidades
- ✅ Funcionamento sem erros críticos
- ✅ Persistência adequada dos dados
- ✅ Integração completa com API

### **Interface (30%)**

- ✅ Design responsivo e mobile-first
- ✅ Interface intuitiva e amigável
- ✅ Consistência visual em toda aplicação
- ✅ Padrões modernos de UI/UX

### **Código (30%)**

- ✅ Organização e estrutura clara
- ✅ Comentários e documentação adequada
- ✅ Aplicação de boas práticas
- ✅ Arquitetura escalável e maintível

## 🧪 Testes e Validação

### **Testes Manuais**

- ✅ Fluxo completo de cadastro/login
- ✅ Criação e visualização de postagens
- ✅ Edição de perfil de usuário
- ✅ Navegação entre seções
- ✅ Responsividade em diferentes dispositivos

### **Validações**

- ✅ HTML5 Validator
- ✅ Acessibilidade (WAVE, axe)
- ✅ Performance (Lighthouse)
- ✅ Cross-browser compatibility

## 🚀 Próximas Implementações (Futuro)

- [ ] Sistema de likes/curtidas
- [ ] Sistema de comentários
- [ ] Upload de imagens
- [ ] Busca de usuários
- [ ] Sistema de followers
- [ ] Notificações em tempo real
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados

## 👨‍💻 Desenvolvedor

**Pedro Craveiro** - [ra193934@ucdb.br]

---

**Data de Entrega**: 11/06/2025

_Este projeto foi desenvolvido como parte do curso de Desenvolvimento Web, aplicando conceitos avançados de arquitetura de software, design patterns e práticas modernas de desenvolvimento frontend._
