# 🎯 NexSites - Funcionalidades Implementadas

## ✅ Funcionalidades Principais

### 1. **Meus Sites** 👤
Mostra **apenas os sites que você criou** após fazer login.

**Como funciona:**
- Você precisa estar **logado** para criar sites
- Clique em **"Meus Sites"** para ver todos os sites que criou
- Os sites aparecem com:
  - Nome, URL e descrição
  - Data de criação
  - Contador de likes e dislikes (👍 👎)
  - Botões para interagir com os sites

**Exemplo:**
1. Login como usuário "joao"
2. Criar um site chamado "Meu Blog"
3. Clique em "Meus Sites" 
4. Você verá apenas "Meu Blog" (sites de outro usuário não aparecem)

---

### 2. **Procurar Sites** 🔍
Busca sites pelo **nome** ou **descrição** em tempo real.

**Como funciona:**
- Clique em **"Procurar"**
- Digite um termo na caixa de busca
- Os resultados aparecem **enquanto você digita**
- A busca funciona tanto no servidor quanto localmente (offline)

**Exemplo:**
1. Clique em "Procurar"
2. Digite "Blog" 
3. Aparecem todos os sites que têm "Blog" no nome ou descrição
4. Limpe o campo para ver a mensagem "Digite um termo para buscar sites..."

---

## 🔄 Fluxo de Dados

### Backend (server.js)
```
GET /api/sites              → Lista todos os sites
GET /api/sites/search?q=X   → Busca sites por nome/descrição
GET /api/sites/popular      → Top 10 sites com mais likes
POST /api/sites/:id/like    → Curtir um site
POST /api/sites/:id/dislike → Descurtir um site
```

### Frontend (java.js)
```
renderSitesHTML()      → Renderiza cards dos sites com botões de like/dislike
attachLikeHandlers()   → Anexa eventos aos botões
showSitesList()        → Mostra sites no container #sites (Home)
```

---

## 💾 Dados Armazenados

**Usuários** (`data/users.json`):
- username
- passwordHash (criptografada com bcrypt)

**Sites** (`data/sites.json`):
- id (timestamp)
- nome
- url
- descri (descrição)
- owner (usuário que criou)
- createdAt (data de criação)
- likes (contador)
- dislikes (contador)
- likedBy (array de usuários que curtiram)
- dislikedBy (array de usuários que descurtiram)

---

## 🧪 Teste Rápido

1. **Inicie o servidor:**
   ```bash
   cd c:\Users\SAMSUNG\.vscode\NexSites\NexSites
   node server.js
   ```

2. **Abra no navegador:**
   ```
   http://localhost:3000
   ```

3. **Teste o fluxo:**
   - Clique em **"Login"** → **"Registrar"** (ex: usuário "test", senha "123")
   - Faça **login** com essas credenciais
   - Clique em **"Criar"** e crie um site
   - Clique em **"Meus Sites"** - seu site aparece aqui ✓
   - Clique em **"Procurar"** e digite para buscar ✓

---

## 📋 Checklist de Funcionalidades

- [x] **Meus Sites** - Filtra sites por usuário logado
- [x] **Procurar Sites** - Busca por nome e descrição em tempo real
- [x] **Like/Dislike** - Botões 👍👎 em todos os cards
- [x] **Home** - Mostra top 10 sites com mais likes
- [x] **Login** - Autenticação com JWT
- [x] **Cadastro** - Registro de novos usuários
- [x] **Fallback Local** - Funciona offline com localStorage

---

## 🚀 Próximos Passos (Opcional)

Se quiser adicionar mais funcionalidades:
- [ ] Editar/deletar sites próprios
- [ ] Comentários nos sites
- [ ] Avatar de usuário
- [ ] Perfil público do usuário
- [ ] Notificações de likes

