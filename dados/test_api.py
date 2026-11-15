#!/usr/bin/env python3
import requests 
import json

BASE_URL = "http://localhost:3000/api"

def test_api():
    print("=== Testando API NexSites ===\n")
    
    # 1. Registrar usuário
    print("1. Registrando usuário 'joao'...")
    res = requests.post(f"{BASE_URL}/register", json={"username": "joao", "password": "senha123"})
    print(f"   Status: {res.status_code} - {res.text}\n")
    
    # 2. Login
    print("2. Fazendo login como 'joao'...")
    res = requests.post(f"{BASE_URL}/login", json={"username": "joao", "password": "senha123"})
    if res.status_code != 200:
        print(f"   Erro: {res.text}\n")
        return
    token = res.json()["token"]
    print(f"   Token obtido: {token[:20]}...\n")
    
    # 3. Criar alguns sites
    print("3. Criando sites...")
    sites_data = [
        {"nome": "GitHub", "url": "https://github.com", "descri": "Plataforma de desenvolvimento"},
        {"nome": "Stack Overflow", "url": "https://stackoverflow.com", "descri": "Respostas para programadores"},
        {"nome": "MDN Web Docs", "url": "https://developer.mozilla.org", "descri": "Documentação Web"}
    ]
    
    headers = {"Authorization": f"Bearer {token}"}
    site_ids = []
    for site in sites_data:
        res = requests.post(f"{BASE_URL}/sites", json=site, headers=headers)
        if res.status_code == 200:
            site_id = res.json()["id"]
            site_ids.append(site_id)
            print(f"   ✓ {site['nome']} criado (id: {site_id})")
        else:
            print(f"   ✗ Erro ao criar {site['nome']}: {res.text}")
    print()
    
    # 4. Fazer alguns likes
    print("4. Fazendo likes em alguns sites...")
    for site_id in site_ids[:2]:
        res = requests.post(f"{BASE_URL}/sites/{site_id}/like", headers=headers)
        print(f"   Like em site {site_id}: {res.status_code}")
    print()
    
    # 5. Buscar sites populares
    print("5. Buscando sites populares (top 10)...")
    res = requests.get(f"{BASE_URL}/sites/popular")
    sites = res.json()
    for site in sites:
        print(f"   - {site['nome']}: {site.get('likes', 0)} likes")
    print()
    
    # 6. Buscar por nome
    print("6. Buscando sites com 'Stack' no nome...")
    res = requests.get(f"{BASE_URL}/sites/search?q=Stack")
    sites = res.json()
    for site in sites:
        print(f"   - {site['nome']}: {site['url']}")
    print()
    
    # 7. Listar todos os sites
    print("7. Listando todos os sites...")
    res = requests.get(f"{BASE_URL}/sites")
    sites = res.json()
    for site in sites:
        print(f"   - {site['nome']} (por {site['owner']}): {site.get('likes', 0)} likes, {site.get('dislikes', 0)} dislikes")
    print()
    
    print("✓ Testes concluídos!")

if __name__ == "__main__":
    try:
        test_api()
    except Exception as e:
        print(f"Erro: {e}")
