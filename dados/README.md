# NexSites

O servidor do projeto é o FastAPI em `main.py`, na raiz. Ele serve o frontend
(`index.html`) e a API na mesma origem. O `server.js` em `dados/` não é mais
necessário para iniciar o site.

Instalação e execução:

```bash
python -m pip install -r requirements.txt
python main.py
```

Abra `http://127.0.0.1:8000`. Se abrir o frontend pelo Live Preview local, as
chamadas da API também serão direcionadas à porta 8000 do FastAPI.
Se usar outra porta, informe a URL da API com o parâmetro `?api=...`.

Usuários, sites e comentários ficam em `data/users.json`, `data/sites.json` e
`data/comments.json`. Defina `JWT_SECRET` com um valor seguro em produção.
