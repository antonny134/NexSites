# 📝 Guia de Cadastro Separado

## ✨ Novas Funcionalidades

### Botão "Cadastro" na Navegação
- Novo botão **"Cadastro"** adicionado na barra de navegação
- Separado do botão **"Login"** para melhor UX

### Status de Usuário
- Mostra **"Logado como [username]"** quando você faz login
- Botão **"Sair"** para fazer logout e limpar sessão

---

## 🧪 Como Testar

### 1️⃣ Teste o Cadastro Separado

#### Via Botão "Cadastro"
1. Abra http://localhost:3000
2. Clique em **"Cadastro"** (novo botão na navegação)
3. Você verá uma tela com:
   - Campo de **Usuário**
   - Campo de **Senha**
   - Campo de **Confirmar Senha**
   - Link para voltar ao **Login**

#### Preencher o Formulário
- **Usuário:** `joao`
- **Senha:** `senha123`
- **Confirmar Senha:** `senha123`
- Clique em **"Cadastrar"**

#### Resultado Esperado
- ✓ Mensagem: "Cadastro realizado com sucesso! Redirecionando para login..."
- Após 2 segundos, redireciona automaticamente para a tela de Login

---

### 2️⃣ Teste o Login

1. Após redirecionar, você estará na tela de **Login**
2. Preencha:
   - **Usuário:** `joao`
   - **Senha:** `senha123`
3. Clique em **"Entrar"**

#### Resultado Esperado
- ✓ Mensagem: "Logado como joao"
- ✓ No topo da página apareça: **"Logado como joao | [Sair]"**
- Após 1.5 segundos, redireciona para a Home

---

### 3️⃣ Teste o Logout

1. Clique no botão **"Sair"** (que aparece no topo quando logado)
2. Você será deslogado e voltará à Home

#### Resultado Esperado
- ✓ Status de usuário desaparece
- ✓ localStorage é limpo
- ✓ Botões de like/dislike exigem novo login

---

### 4️⃣ Teste Validações de Cadastro

#### Senhas Diferentes
1. Vá para **"Cadastro"**
2. Preencha:
   - Usuário: `maria`
   - Senha: `123`
   - Confirmar Senha: `456`
3. Clique em **"Cadastrar"**
- ✓ Erro: "Senhas não correspondem"

#### Senha Muito Curta
1. Vá para **"Cadastro"**
2. Preencha:
   - Usuário: `pedro`
   - Senha: `12`
   - Confirmar Senha: `12`
3. Clique em **"Cadastrar"**
- ✓ Erro: "Senha deve ter no mínimo 3 caracteres"

#### Usuário Já Existe
1. Cadastre um usuário: `ana`
2. Tente cadastrar novamente com o mesmo nome
- ✓ Erro: "Usuário já existe"

---

### 5️⃣ Teste Links de Redirecionamento

#### Login → Cadastro
1. Na tela de **Login**, clique em: "Clique aqui para se cadastrar"
- ✓ Vai para a tela de **Cadastro**

#### Cadastro → Login
1. Na tela de **Cadastro**, clique em: "Clique aqui para fazer login"
- ✓ Volta para a tela de **Login**

---

## 📊 Resumo das Mudanças

| Antes | Depois |
|-------|--------|
| Um botão "Login" com cadastro dentro | Dois botões: "Cadastro" e "Login" |
| Sem feedback visual de login | Mostra "Logado como [username]" |
| Sem logout | Botão "Sair" para logout |
| Formulários misturados | Interfaces separadas e claras |

---

## ✅ Checklist de Testes

- [ ] Cadastro funciona via botão "Cadastro"
- [ ] Validação de senhas diferentes
- [ ] Validação de senha curta
- [ ] Validação de usuário duplicado
- [ ] Login funciona após cadastro
- [ ] Status de usuário mostra corretamente
- [ ] Botão "Sair" faz logout
- [ ] Links de redirecionamento funcionam
- [ ] Dados persistem em `data/users.json`
- [ ] Senhas estão criptografadas em `data/users.json`

