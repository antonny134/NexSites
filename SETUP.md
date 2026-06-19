# 🚀 NexSites - Guia de Inicialização

## ⚠️ IMPORTANTE: O Servidor Precisa Estar Rodando!

Antes de acessar o site, você **DEVE** instalar as dependências e iniciar o servidor.

---

## 📋 Pré-requisitos

- **Node.js** instalado (versão 12+)
- **npm** instalado

---

## 🔧 Instalação (Primeira vez)

### 1️⃣ Abrir Terminal/PowerShell

```bash
# Navegar para a pasta do projeto
cd c:\Users\SAMSUNG\.vscode\NexSites\NexSites
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

Isso vai instalar os pacotes:
- `express` - servidor web
- `bcryptjs` - criptografia de senhas
- `cors` - permissão de requisições
- `jsonwebtoken` - autenticação JWT

**Você só precisa fazer isso uma vez!**

---

## 🎯 Rodar o Servidor

### Cada vez que quiser usar o site:

1. **Abra um Terminal/PowerShell**

2. **Navegue para a pasta:**
```bash
cd c:\Users\SAMSUNG\.vscode\NexSites\NexSites
```

3. **Inicie o servidor:**
```bash
node server.js
```

4. **Você deve ver a mensagem:**
```
Server running on http://localhost:3000
```

---

## 🌐 Acessar o Site

Depois que o servidor estiver rodando:

1. Abra o navegador
2. Vá para: **http://localhost:3000**

---

## ✅ Checklist

- [ ] Node.js está instalado? (teste: `node --version`)
- [ ] npm está instalado? (teste: `npm --version`)
- [ ] Você rodou `npm install`?
- [ ] Você iniciou o servidor com `node server.js`?
- [ ] Você vê a mensagem "Server running on http://localhost:3000"?

---

## 🧪 Teste Rápido

1. **Terminal:**
```bash
cd c:\Users\SAMSUNG\.vscode\NexSites\NexSites
npm install
node server.js
```

2. **Navegador:**
```
http://localhost:3000
```

3. **Teste:**
   - Clique em "Cadastro"
   - Preencha: usuario: `teste` | senha: `123` | confirmar: `123`
   - Clique em "Cadastrar"
   - Deve aparecer a mensagem: "✓ Cadastro realizado com sucesso!"

---

## 🆘 Se Não Funcionar

### Erro: "Cannot find module 'express'"
→ Você não rodou `npm install` ainda

**Solução:**
```bash
npm install
```

### Erro: "Port 3000 already in use"
→ Outra aplicação está usando a porta 3000

**Solução (opção 1):**
- Feche a outra aplicação

**Solução (opção 2):**
- Use outra porta:
```bash
PORT=3001 node server.js
```
Depois acesse: `http://localhost:3001`

### Página branca/vazia
→ O servidor não está rodando

**Solução:**
- Verifique o terminal
- Se não vir "Server running on...", rode novamente: `node server.js`

### Cadastro não funciona
→ Verifique se:
1. O servidor está rodando (veja o terminal)
2. Você está em http://localhost:3000
3. Abra a console do navegador (F12) e procure por erros

---

## 📝 Dados do Sistema

Todos os dados são salvos em:
- `data/users.json` - Usuários registrados
- `data/sites.json` - Sites criados

Esses arquivos são criados automaticamente na primeira execução.

---

## 🎓 Estrutura do Projeto

```
NexSites/
├── index.html        (Interface do site)
├── java.js          (Lógica do cliente)
├── server.js        (API do servidor)
├── package.json     (Dependências)
├── data/
│   ├── users.json   (Usuários)
│   └── sites.json   (Sites)
└── README.md        (Este arquivo)
```

---

## 💡 Dicas

- Mantém um terminal aberto com `node server.js` enquanto usa o site
- Se mudar o código, reinicie o servidor (Ctrl+C e depois `node server.js` novamente)
- Use `npm start` como atalho para `node server.js` (definido no package.json)

```bash
npm start
```

