# 🚀 NexSites - Guia de Inicialização

## ⚠️ IMPORTANTE: O Servidor Precisa Estar Rodando!

Antes de acessar o site, você **DEVE** instalar as dependências e iniciar o servidor.

---

## 📋 Pré-requisitos

- **Python** 3.10+ instalado

---

## 🔧 Instalação (Primeira vez)

### 1️⃣ Abrir Terminal/PowerShell

```bash
# Navegar para a pasta do projeto
cd c:\Users\SAMSUNG\.vscode\NexSites\NexSites
```

### 2️⃣ Instalar Dependências

```bash
python -m pip install -r requirements.txt
```

**Você só precisa fazer isso uma vez!**

---

## 🎯 Rodar o Servidor

### Cada vez que quiser usar o site:

1. **Abra um Terminal/PowerShell**

2. **Navegue para a pasta:**
```bash
cd c:\Users\SAMSUNG\.vscode\NexSites\NexSites
```

3. **Inicie o servidor Python:**
```bash
python main.py
```

4. **Você deve ver a mensagem:**
```
Uvicorn running on http://127.0.0.1:8000
```

---

## 🌐 Acessar o Site

Depois que o servidor estiver rodando:

1. Abra o navegador
2. Vá para: **http://127.0.0.1:8000**

---

## ✅ Checklist

- [ ] Python está instalado? (teste: `python --version`)
- [ ] Você instalou as dependências com `python -m pip install -r requirements.txt`?
- [ ] Você iniciou o servidor com `python main.py`?
- [ ] Você vê a mensagem "Uvicorn running on http://127.0.0.1:8000"?

---

## 🧪 Teste Rápido

1. **Terminal:**
```bash
cd c:\Users\SAMSUNG\.vscode\NexSites\NexSites
python -m pip install -r requirements.txt
python main.py
```

2. **Navegador:**
```
http://127.0.0.1:8000
```

3. **Teste:**
   - Clique em "Cadastro"
   - Preencha: usuario: `teste` | senha: `123` | confirmar: `123`
   - Clique em "Cadastrar"
   - Deve aparecer a mensagem: "✓ Cadastro realizado com sucesso!"

---

## 🆘 Se Não Funcionar

### Erro: "No module named fastapi"
→ As dependências Python ainda não foram instaladas

**Solução:**
```bash
python -m pip install -r requirements.txt
```

### Erro: "Port 8000 already in use"
→ Outra aplicação está usando a porta 8000.

**Solução (opção 1):**
- Feche a outra aplicação

**Solução (opção 2):**
- No PowerShell, escolha outra porta:
```bash
$env:PORT = "8001"
python main.py
```
Depois acesse: `http://127.0.0.1:8001`
Se a página também estiver sendo servida nessa porta, abra:
`http://127.0.0.1:8001/?api=http://127.0.0.1:8001`

### Página branca/vazia
→ O servidor não está rodando ou o navegador ainda está acessando o servidor Node antigo.

**Solução:**
- Verifique o terminal e abra `http://127.0.0.1:8000`

### Cadastro não funciona
→ Verifique se:
1. O servidor está rodando (veja o terminal)
2. Você está em http://127.0.0.1:8000
3. Abra a console do navegador (F12) e procure por erros

---

## 📝 Dados do Sistema

Todos os dados são salvos em:
- `data/users.json` - Usuários registrados
- `data/sites.json` - Sites criados
- `data/comments.json` - Comentários e respostas

Esses arquivos são criados automaticamente na primeira execução.

---

## 🎓 Estrutura do Projeto

```
NexSites/
├── index.html        (Interface do site)
├── main.py          (API e servidor do site)
├── requirements.txt (Dependências Python)
├── java.js          (Lógica do cliente)
├── data/
│   ├── users.json   (Usuários)
│   └── sites.json   (Sites)
└── README.md        (Este arquivo)
```

---

## 💡 Dicas

- Mantenha um terminal aberto com `python main.py` enquanto usa o site
- Se mudar o código, reinicie o servidor (Ctrl+C e depois `python main.py` novamente)
- Use `set PORT=8001` no Windows para escolher outra porta.
