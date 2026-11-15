# NexSites (demo)

Servidor simples em Node.js que fornece API para registro, login e envio de sites. O frontend (`index.html` + `java.js`) consome essa API; se o servidor não estiver disponível, há um fallback local via `localStorage`.

Instalação e execução:

1. No terminal, instale dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm start
```

3. Abra o navegador em `http://localhost:3000`.

Notas:
- Usuários e sites são armazenados em `data/users.json` e `data/sites.json`.
- Para um ambiente de produção, troque `JWT_SECRET` e use armazenamento e validações adequadas.
