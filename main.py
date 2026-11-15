import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

app = FastAPI()

DATA_FILE = Path(__file__).resolve().parent / "data" / "sites.json"


def load_database() -> list[dict[str, Any]]:
    if not DATA_FILE.exists():
        return []

    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError(f"{DATA_FILE} precisa conter uma lista JSON")
    return data


def save_database(sites: list[dict[str, Any]]) -> None:
    temporary_file = DATA_FILE.with_suffix(".json.tmp")
    temporary_file.write_text(
        json.dumps(sites, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    temporary_file.replace(DATA_FILE)


database: list[dict[str, Any]] = load_database()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET","POST"],
    allow_headers=["*"],
)

@app.get("/")
def incio():
    return FileResponse(Path(__file__).resolve().parent / "index.html")


@app.get("/api/sites")
def list_sites():
    return database


@app.post("/api/sites")
def create_site(site_data: dict[str, Any]):
    nome = site_data.get("nome")
    url = site_data.get("url")
    if not isinstance(nome, str) or not nome.strip():
        raise HTTPException(status_code=400, detail="nome é obrigatório")
    if not isinstance(url, str) or not url.strip():
        raise HTTPException(status_code=400, detail="url é obrigatória")

    numeric_ids = [
        site["id"]
        for site in database
        if isinstance(site.get("id"), int) and not isinstance(site.get("id"), bool)
    ]
    new_site = {
        "id": max(numeric_ids, default=0) + 1,
        "nome": nome.strip(),
        "url": url.strip(),
        "descri": str(site_data.get("descri") or "").strip(),
        "owner": str(site_data.get("owner") or "admin"),
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "likes": 0,
        "dislikes": 0,
        "likedBy": [],
        "dislikedBy": [],
    }

    updated_database = [new_site, *database]
    save_database(updated_database)
    database[:] = updated_database
    return new_site


if __name__ == "__main__":
 uvicorn.run(app, host="127.0.0.1", port=8000)