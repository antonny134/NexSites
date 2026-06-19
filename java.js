const tela = document.getElementById("tela")
const criar = document.getElementById("criar")
const meusites = document.getElementById("meusites")
const procuraBtn = document.getElementById("procurar")
const loginBtn = document.getElementById("loginBtn")
const cadastroBtn = document.getElementById("cadastro")

let historico = JSON.parse(localStorage.getItem('nex_historico') || '[]')
let token = localStorage.getItem('nex_token') || null
let username = localStorage.getItem('nex_user') || null
let hasServer = true

async function tryDetectServer() {
    try {
        const res = await fetch('/api/sites')
        if (!res.ok) throw new Error('no api')
        return true
    } catch (e) {
        return false
    }
}

function saveLocal() {
    localStorage.setItem('nex_historico', JSON.stringify(historico))
}

function updateUserStatus() {
    // Limpar status anterior
    const oldStatus = document.querySelector('.user-status')
    if (oldStatus) oldStatus.remove()
    
    if (token && username) {
        // Inserir status de usuário logado
        const catalogo = document.querySelector('.catalogo')
        const statusDiv = document.createElement('div')
        statusDiv.className = 'user-status'
        statusDiv.innerHTML = `
            <span>Logado como <strong>${username}</strong></span>
            <button id="logoutBtn">Sair</button>
        `
        catalogo.parentElement.insertBefore(statusDiv, catalogo)
        
        document.getElementById('logoutBtn').addEventListener('click', () => {
            token = null
            username = null
            localStorage.removeItem('nex_token')
            localStorage.removeItem('nex_user')
            updateUserStatus()
            loadAndShowSites()
        })
    }
}

function renderSitesHTML(sitesArray, containerId) {
    if (!sitesArray || sitesArray.length === 0) {
        return '<p style="color:white; padding:15px;">Nenhum site encontrado.</p>'
    }
    let html = ''
    sitesArray.forEach(site => {
        const liked = site.likedBy && username && site.likedBy.includes(username)
        const disliked = site.dislikedBy && username && site.dislikedBy.includes(username)
        html += `
            <div class="product-card">
                <h2>${site.nome}</h2>
                <strong>Site:</strong>
                <a href="${site.url}" target="_blank">${site.url}</a>
                <p><strong>Descrição:</strong> ${site.descri || ''}</p>
                <p style="font-size:12px;color:#999">Enviado por: ${site.owner || 'local'} - ${site.createdAt ? site.createdAt.split('T')[0] : ''}</p>
                <div style="margin-top:8px;">
                    <button class="like-btn" data-id="${site.id}" style="margin-right:6px; background:#1dbf1d; color:#000; border:none; padding:6px 12px; border-radius:5px; cursor:pointer;">👍 ${site.likes || 0}</button>
                    <button class="dislike-btn" data-id="${site.id}" style="background:#d9534f; color:#fff; border:none; padding:6px 12px; border-radius:5px; cursor:pointer;">👎 ${site.dislikes || 0}</button>
                </div>
            </div>
        `
    })
    return html
}

function attachLikeHandlers(callback) {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.removeEventListener('click', btn.clickHandler)
        btn.clickHandler = async (e) => {
            const id = btn.getAttribute('data-id')
            if (!token) {
                alert('Faça login para curtir sites')
                return
            }
            if (hasServer) {
                try {
                    await fetch(`/api/sites/${id}/like`, { method: 'POST', headers: { 'Authorization': 'Bearer ' + token } })
                    if (callback) callback()
                    return
                } catch (err) { hasServer = false }
            }
            const idx = historico.findIndex(s => String(s.id) === String(id))
            if (idx !== -1) {
                historico[idx].likes = (historico[idx].likes || 0) + 1
                saveLocal()
                if (callback) callback()
            }
        }
        btn.addEventListener('click', btn.clickHandler)
    })
    document.querySelectorAll('.dislike-btn').forEach(btn => {
        btn.removeEventListener('click', btn.clickHandler)
        btn.clickHandler = async (e) => {
            const id = btn.getAttribute('data-id')
            if (!token) {
                alert('Faça login para descurtir sites')
                return
            }
            if (hasServer) {
                try {
                    await fetch(`/api/sites/${id}/dislike`, { method: 'POST', headers: { 'Authorization': 'Bearer ' + token } })
                    if (callback) callback()
                    return
                } catch (err) { hasServer = false }
            }
            const idx = historico.findIndex(s => String(s.id) === String(id))
            if (idx !== -1) {
                historico[idx].dislikes = (historico[idx].dislikes || 0) + 1
                saveLocal()
                if (callback) callback()
            }
        }
        btn.addEventListener('click', btn.clickHandler)
    })
}

function showSitesList(sitesArray) {
    const sitesContainer = document.getElementById('sites')
    if (!sitesContainer) return
    sitesContainer.innerHTML = renderSitesHTML(sitesArray, 'sites')
    attachLikeHandlers(() => loadAndShowSites())
}

const homeBtn = document.getElementById('home')
if (homeBtn) {
    homeBtn.addEventListener('click', (e) => {
        e.preventDefault()
        loadAndShowSites()
    })
}

async function loadAndShowSites() {
    if (hasServer) {
        try {
            // show popular on home
            const res = await fetch('/api/sites/popular')
            const sites = await res.json()
            showSitesList(sites)
            return
        } catch (e) {
            hasServer = false
        }
    }
    // fallback local
    // show top 10 by likes locally
    const sorted = historico.slice().sort((a, b) => (b.likes || 0) - (a.likes || 0))
    showSitesList(sorted.slice(0, 10))
}

criar.addEventListener('click', () => {
    tela.innerHTML = `
        <nav class="tela2">
                <div class="pts">
                        <div class="logo2">
                                <h3>Lance seu site</h3>
                        </div>
                        <div class="ps">
                                <form id="formulario">
                                        <label>Nome:</label>
                                        <input type="text" placeholder="Ex: meusite" required id="nome">
                                        <br><br>
                                        <label>Url:</label>
                                        <input type="text" placeholder="Ex: https://meusite.com.br" required id="url">
                                        <br><br>
                                        <label>Descrição</label><br>
                                        <textarea placeholder="Foi feito para você!" required id="descri"></textarea>
                                        <br><br>
                                        <button type="submit">Enviar</button>
                                </form>
                        </div>
                </div>
        </nav>
    `
    const form = document.getElementById('formulario')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const nome = document.getElementById('nome').value.trim()
        const url = document.getElementById('url').value.trim()
        const descri = document.getElementById('descri').value.trim()

        if (hasServer && token) {
            try {
                const res = await fetch('/api/sites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ nome, url, descri })
                })
                if (!res.ok) throw new Error('failed')
                const site = await res.json()
                tela.innerHTML = `<div class="resultado"><h2>${site.nome}</h2><strong>Site:</strong><a href="${site.url}" target="_blank">${site.url}</a><p><strong>Descrição:</strong>${site.descri}</p></div>`
                loadAndShowSites()
                return
            } catch (err) {
                // fallback to local
                hasServer = false
            }
        }

        historico.unshift({ nome, url, descri, owner: username || 'local', createdAt: new Date().toISOString() })
        saveLocal()
        tela.innerHTML = `<div class="resultado"><h2>${nome}</h2><strong>Site:</strong><a href="${url}" target="_blank">${url}</a><p><strong>Descrição:</strong>${descri}</p></div>`
        loadAndShowSites()
    })
})

meusites.addEventListener('click', async () => {
    tela.innerHTML = `
        <div style="padding:15px;">
            <h2 style="color:white;">SEUS SITES</h2>
            <nav class="sites" id="sites"></nav>
        </div>
    `
    if (hasServer) {
        try {
            const res = await fetch('/api/sites')
            const sites = await res.json()
            const mine = sites.filter(s => s.owner === username)
            showSitesList(mine)
            return
        } catch (e) {
            hasServer = false
        }
    }

    // local fallback
    const mineLocal = historico.filter(s => s.owner === username)
    showSitesList(mineLocal)
})

procuraBtn.addEventListener('click', () => {
    tela.innerHTML = `
         <div class="procurar">
                <input type="text" placeholder="Procurar Sites..." id="pesquisa">
        </div>
         <nav class="sites" id="sites"></nav>
        `
    const pesquisa = document.getElementById('pesquisa')
    const doSearch = async () => {
        const valor = pesquisa.value.toLowerCase().trim()
        
        if (!valor) {
            const sitesContainer = document.getElementById('sites')
            if (sitesContainer) {
                sitesContainer.innerHTML = '<p style="color:white; padding:15px;">Digite um termo para buscar sites...</p>'
            }
            return
        }
        
        let encontrados = []
        
        if (hasServer) {
            try {
                const res = await fetch('/api/sites/search?q=' + encodeURIComponent(valor))
                encontrados = await res.json()
            } catch (e) { 
                hasServer = false
                // fallback local
                encontrados = historico.filter(site => 
                    site.nome.toLowerCase().includes(valor) || 
                    (site.descri && site.descri.toLowerCase().includes(valor))
                )
            }
        } else {
            // busca local
            encontrados = historico.filter(site => 
                site.nome.toLowerCase().includes(valor) || 
                (site.descri && site.descri.toLowerCase().includes(valor))
            )
        }
        
        const sitesContainer = document.getElementById('sites')
        if (sitesContainer) {
            sitesContainer.innerHTML = renderSitesHTML(encontrados, 'sites')
            attachLikeHandlers(doSearch)
        }
    }
    
    pesquisa.addEventListener('input', doSearch)
})

loginBtn.addEventListener('click', () => {
    tela.innerHTML = `
        <div style="padding:15px;color:white;">
            <h2>Login</h2>
            <p style="color:#ccc; font-size:14px;">Entre com suas credenciais</p>
            <div style="margin-top:20px;">
                <form id="loginForm">
                    <label style="display:block; margin-bottom:8px;">Usuário</label>
                    <input id="uuser" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #666; border-radius:5px; background:#333; color:#fff;" required>
                    <label style="display:block; margin-bottom:8px;">Senha</label>
                    <input id="upass" type="password" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #666; border-radius:5px; background:#333; color:#fff;" required>
                    <button type="submit" style="width:100%; padding:10px; background:#1dbf1d; color:#000; border:none; border-radius:5px; cursor:pointer; font-weight:bold; font-size:16px;">Entrar</button>
                </form>
            </div>
            <div id="authMessage" style="margin-top:15px;color:lightgreen;"></div>
            <hr style="margin:20px 0; border:none; border-top:1px solid #666;">
            <p style="color:#ccc; font-size:14px;">Não tem uma conta? <a href="#" id="linkCadastro" style="color:#1dbf1d; text-decoration:none; cursor:pointer; font-weight:bold;">Clique aqui para se cadastrar</a></p>
        </div>
    `
    const loginForm = document.getElementById('loginForm')
    const authMessage = document.getElementById('authMessage')
    const linkCadastro = document.getElementById('linkCadastro')

    linkCadastro.addEventListener('click', (e) => {
        e.preventDefault()
        cadastroBtn.click()
    })

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const u = document.getElementById('uuser').value.trim()
        const p = document.getElementById('upass').value.trim()
        try {
            const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: u, password: p }) })
            if (!res.ok) throw new Error('login failed')
            const data = await res.json()
            token = data.token
            username = u
            localStorage.setItem('nex_token', token)
            localStorage.setItem('nex_user', username)
            authMessage.style.color = 'lightgreen'
            authMessage.textContent = '✓ Logado como ' + username
            updateUserStatus()
            setTimeout(() => loadAndShowSites(), 1500)
        } catch (err) {
            authMessage.style.color = 'salmon'
            authMessage.textContent = '✗ Erro: usuário ou senha incorretos'
        }
    })
})

cadastroBtn.addEventListener('click', () => {
    tela.innerHTML = `
        <div style="padding:15px;color:white;">
            <h2>Criar Conta</h2>
            <p style="color:#ccc; font-size:14px;">Preencha os dados abaixo para criar sua conta</p>
            <div style="margin-top:20px;">
                <form id="regForm">
                    <label style="display:block; margin-bottom:8px;">Usuário</label>
                    <input id="ruser" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #666; border-radius:5px; background:#333; color:#fff;" placeholder="Escolha um nome de usuário" required>
                    <label style="display:block; margin-bottom:8px;">Senha</label>
                    <input id="rpass" type="password" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #666; border-radius:5px; background:#333; color:#fff;" placeholder="Crie uma senha forte" required>
                    <label style="display:block; margin-bottom:8px;">Confirmar Senha</label>
                    <input id="rpass2" type="password" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #666; border-radius:5px; background:#333; color:#fff;" placeholder="Repita sua senha" required>
                    <button type="submit" style="width:100%; padding:10px; background:#1dbf1d; color:#000; border:none; border-radius:5px; cursor:pointer; font-weight:bold; font-size:16px;">Cadastrar</button>
                </form>
            </div>
            <div id="regMessage" style="margin-top:15px;color:lightgreen;"></div>
            <hr style="margin:20px 0; border:none; border-top:1px solid #666;">
            <p style="color:#ccc; font-size:14px;">Já tem uma conta? <a href="#" id="linkLogin" style="color:#1dbf1d; text-decoration:none; cursor:pointer; font-weight:bold;">Clique aqui para fazer login</a></p>
        </div>
    `
    const regForm = document.getElementById('regForm')
    const regMessage = document.getElementById('regMessage')
    const linkLogin = document.getElementById('linkLogin')

    linkLogin.addEventListener('click', (e) => {
        e.preventDefault()
        loginBtn.click()
    })

    regForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const u = document.getElementById('ruser').value.trim()
        const p = document.getElementById('rpass').value.trim()
        const p2 = document.getElementById('rpass2').value.trim()
        
        if (p !== p2) {
            regMessage.style.color = 'salmon'
            regMessage.textContent = '✗ Erro: as senhas não correspondem'
            return
        }
        
        if (p.length < 3) {
            regMessage.style.color = 'salmon'
            regMessage.textContent = '✗ Erro: a senha deve ter no mínimo 3 caracteres'
            return
        }
        
        try {
            const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: u, password: p }) })
            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.error || 'register failed')
            }
            regMessage.style.color = 'lightgreen'
            regMessage.textContent = '✓ Cadastro realizado com sucesso! Redirecionando para login...'
            setTimeout(() => loginBtn.click(), 2000)
        } catch (err) {
            regMessage.style.color = 'salmon'
            regMessage.textContent = '✗ Erro: ' + (err.message === 'user exists' ? 'Usuário já existe' : 'Erro ao registrar')
        }
    })
})

// inicialização
(async () => {
    hasServer = await tryDetectServer()
    updateUserStatus()
    loadAndShowSites()
})()
