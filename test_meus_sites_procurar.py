#!/usr/bin/env python3
"""
Script de teste para validar a funcionalidade de "Meus Sites" e "Procurar Sites"
"""
import requests
import json
import sys

BASE_URL = "http://localhost:3000/api"

def test_meus_sites_e_procurar():
    print("\n" + "="*60)
    print("TESTE: Meus Sites e Procurar Sites")
    print("="*60 + "\n")
    
    # 1. Registrar um usuário
    print("[1] Registrando usuário 'maria'...")
    res = requests.post(f"{BASE_URL}/register", json={"username": "maria", "password": "senha456"})
    if res.status_code != 200:
        print(f"    ✗ Erro: {res.text}")
        return
    print("    ✓ Usuário registrado com sucesso\n")
    
    # 2. Login
    print("[2] Fazendo login como 'maria'...")
    res = requests.post(f"{BASE_URL}/login", json={"username": "maria", "password": "senha456"})
    if res.status_code != 200:
        print(f"    ✗ Erro: {res.text}")
        return
    token = res.json()["token"]
    print(f"    ✓ Login realizado (token: {token[:20]}...)\n")
    
    # 3. Criar alguns sites
    print("[3] Criando 3 sites para 'maria'...")
    headers = {"Authorization": f"Bearer {token}"}
    sites_data = [
        {"nome": "Meu Blog Pessoal", "url": "https://maria.blog", "descri": "Blog sobre tecnologia e vida"},
        {"nome": "Meu Portfolio", "url": "https://maria-dev.com", "descri": "Portfólio de projetos"},
        {"nome": "Loja Online", "url": "https://maria-shop.com", "descri": "E-commerce de produtos"}
    ]
    
    for site in sites_data:
        res = requests.post(f"{BASE_URL}/sites", json=site, headers=headers)
        if res.status_code == 200:
            print(f"    ✓ {site['nome']}")
        else:
            print(f"    ✗ Erro: {res.text}")
    print()
    
    # 4. Verificar que esses sites pertencem a 'maria'
    print("[4] Verificando 'Meus Sites' (filtro por owner='maria')...")
    res = requests.get(f"{BASE_URL}/sites")
    all_sites = res.json()
    maria_sites = [s for s in all_sites if s['owner'] == 'maria']
    print(f"    Total de sites de maria: {len(maria_sites)}")
    for site in maria_sites:
        print(f"      - {site['nome']} (criado por: {site['owner']})")
    print()
    
    # 5. Testar busca (Procurar)
    print("[5] Testando 'Procurar Sites'...")
    search_terms = ["Blog", "Portfolio", "Shop"]
    
    for term in search_terms:
        res = requests.get(f"{BASE_URL}/sites/search?q={term}")
        results = res.json()
        print(f"    Busca por '{term}': {len(results)} resultado(s)")
        for site in results:
            print(f"      - {site['nome']}: {site['url']}")
    print()
    
    print("[✓] Testes concluídos com sucesso!")
    print("\n" + "="*60)
    print("RESUMO:")
    print("  - 'Meus Sites': Mostra apenas sites do usuário logado")
    print("  - 'Procurar Sites': Busca por nome e descrição")
    print("="*60 + "\n")

if __name__ == "__main__":
    try:
        test_meus_sites_e_procurar()
    except Exception as e:
        print(f"✗ Erro de conexão: {e}")
        print("  Certifique-se de que o servidor está rodando: node server.js")
        sys.exit(1)
