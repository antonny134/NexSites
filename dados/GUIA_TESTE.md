# 🎯 GUIA RÁPIDO - Meus Sites e Procurar

## 1️⃣ Iniciar o Servidor

```bash
cd c:\Users\SAMSUNG\.vscode\NexSites\NexSites
node server.js
```

Você deve ver:
```
Server running on http://localhost:3000
```

---

## 2️⃣ Abrir no Navegador

```
http://localhost:3000
```

---

## 3️⃣ Fluxo de Teste - MEUS SITES

### Passo 1: Registrar
- Clique em **"Login"**
- Clique em **"Registrar"** (campo inferior)
- Digite: `username: joao` e `password: senha123`
- Clique em **"Registrar"** (botão)
- Mensagem: "Registrado com sucesso. Faça login."

### Passo 2: Fazer Login
- Preencha: `username: joao` e `password: senha123`
- Clique em **"Entrar"** (botão superior)
- Mensagem: "Logado como joao"

### Passo 3: Criar um Site
- Clique em **"Criar"**
- Preencha:
  - Nome: `Meu Blog`
  - URL: `https://meublog.com`
  - Descrição: `Um blog sobre tecnologia`
- Clique em **"Enviar"**
- Você verá o site aparecido

### Passo 4: Ver Meus Sites
- Clique em **"Meus Sites"**
- Você verá **apenas o site que criou** ("Meu Blog")
- ✅ Outros usuários não veem este site aqui!

### Passo 5: Curtir (Like)
- Na página "Meus Sites", clique no botão 👍
- O contador aumenta
- Volte à **"Home"** - seu site aparece nos populares (top 10)

---

## 4️⃣ Fluxo de Teste - PROCURAR SITES

### Passo 1: Crie vários sites
- Crie mais alguns sites (ex: "GitHub", "Stack Overflow")

### Passo 2: Procurar
- Clique em **"Procurar"**
- Veja a mensagem: "Digite um termo para buscar sites..."

### Passo 3: Digitar para Buscar
- Digite: `Blog`
- Resultado: Aparece "Meu Blog" (e outros que têm "Blog" no nome)
- Digite: `GitHub`
- Resultado: Aparece o site "GitHub"

### Passo 4: Busca em Tempo Real
- Enquanto você digita, os resultados atualizam **automaticamente**
- Limpe o campo → volta a mensagem inicial

---

## 5️⃣ Testar com Outro Usuário

### Passo 1: Logout
- Abra outra aba do navegador
- Ou limpe o localStorage: F12 → Application → Clear All

### Passo 2: Registrar outro usuário
- Clique em **"Login"**
- Registre: `username: maria` e `password: senha456`

### Passo 3: Login como Maria
- Faça login como "maria"

### Passo 4: Ver Todos os Sites
- Clique em **"Home"**
- Você vê: "Meu Blog" (de joao) e outros populares

### Passo 5: Meus Sites como Maria
- Clique em **"Meus Sites"**
- Resultado: Vazio! (maria ainda não criou nenhum site)
- Crie um: "Portfólio de Maria"
- Clique em **"Meus Sites"**
- Resultado: Aparece apenas "Portfólio de Maria" ✅

### Passo 6: Procurar como Maria
- Clique em **"Procurar"**
- Digite: `Blog`
- Resultado: Aparece "Meu Blog" (de joao) e qualquer outro que tenha "Blog"
- ✅ Busca retorna TODOS os sites, não apenas seus

---

## 📊 Resumo

| Funcionalidade | O que Faz |
|---|---|
| **Meus Sites** | Mostra APENAS seus sites (filtro por owner) |
| **Procurar** | Busca por nome/descrição em TODOS os sites |
| **Home** | Mostra top 10 sites com mais likes |
| **Like** | Clique 👍 para curtir (requer login) |
| **Dislike** | Clique 👎 para descurtir (requer login) |

---

## ⚠️ Observações

1. **Login é obrigatório** para curtir, descurtir e criar sites
2. **Busca funciona offline** (localStorage) se servidor cair
3. **Like/Dislike** são exclusivos por usuário (não pode dar 2 likes)
4. **Dados persistem** em `data/sites.json` e `data/users.json`

---

## 🆘 Troubleshooting

### "Erro no login"
- Verifique se digitou username e password corretos
- Verifique se o servidor está rodando (veja "Server running on..." no terminal)

### "Servidor indisponível"
- Verifique se `node server.js` está rodando
- Tente recarregar a página (F5)

### "Nenhum site encontrado em Procurar"
- Certifique-se de que:
  - Criou algum site (clique em "Criar")
  - Está digitando um termo válido
  - O campo não está vazio

