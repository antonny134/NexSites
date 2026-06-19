const express = require('express')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
const DATA_DIR = path.join(__dirname, 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')
const SITES_FILE = path.join(DATA_DIR, 'sites.json')
const SECRET = process.env.JWT_SECRET || 'dev-secret'
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR)
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]')
  if (!fs.existsSync(SITES_FILE)) fs.writeFileSync(SITES_FILE, '[]')
}

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')) } catch (e) { return [] }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

ensureDataFiles()

app.post('/api/register', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'username and password required' })
  const users = readJSON(USERS_FILE)
  if (users.find(u => u.username === username)) return res.status(400).json({ error: 'user exists' })
  const hash = bcrypt.hashSync(password, 8)
  users.push({ username, passwordHash: hash })
  writeJSON(USERS_FILE, users)
  return res.json({ ok: true })
})

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'username and password required' })
  const users = readJSON(USERS_FILE)
  const user = users.find(u => u.username === username)
  if (!user) return res.status(400).json({ error: 'invalid credentials' })
  const ok = bcrypt.compareSync(password, user.passwordHash)
  if (!ok) return res.status(400).json({ error: 'invalid credentials' })
  const token = jwt.sign({ username }, SECRET, { expiresIn: '8h' })
  return res.json({ token })
})

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: 'missing auth' })
  const parts = auth.split(' ')
  if (parts.length !== 2) return res.status(401).json({ error: 'invalid auth' })
  const token = parts[1]
  try {
    const payload = jwt.verify(token, SECRET)
    req.user = payload
    next()
  } catch (e) {
    return res.status(401).json({ error: 'invalid token' })
  }
}

app.get('/api/sites', (req, res) => {
  const sites = readJSON(SITES_FILE)
  res.json(sites)
})

app.post('/api/sites', authMiddleware, (req, res) => {
  const { nome, url, descri } = req.body
  if (!nome || !url) return res.status(400).json({ error: 'nome and url required' })
  const sites = readJSON(SITES_FILE)
  const site = {
    id: Date.now(),
    nome,
    url,
    descri: descri || '',
    owner: req.user.username,
    createdAt: new Date().toISOString(),
    likes: 0,
    dislikes: 0,
    likedBy: [],
    dislikedBy: []
  }
  sites.unshift(site)
  writeJSON(SITES_FILE, sites)
  res.json(site)
})

app.get('/api/sites/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase()
  const sites = readJSON(SITES_FILE)
  if (!q) return res.json(sites)
  const found = sites.filter(s => (s.nome || '').toLowerCase().includes(q) || (s.descri || '').toLowerCase().includes(q))
  res.json(found)
})

app.get('/api/sites/popular', (req, res) => {
  const sites = readJSON(SITES_FILE)
  const sorted = sites.slice().sort((a, b) => (b.likes || 0) - (a.likes || 0))
  res.json(sorted.slice(0, 10))
})

app.post('/api/sites/:id/like', authMiddleware, (req, res) => {
  const id = Number(req.params.id)
  const sites = readJSON(SITES_FILE)
  const site = sites.find(s => s.id === id)
  if (!site) return res.status(404).json({ error: 'site not found' })
  site.likedBy = site.likedBy || []
  site.dislikedBy = site.dislikedBy || []
  const user = req.user.username
  if (site.likedBy.includes(user)) {
    // remove like
    site.likedBy = site.likedBy.filter(u => u !== user)
    site.likes = Math.max(0, (site.likes || 0) - 1)
  } else {
    site.likedBy.push(user)
    site.likes = (site.likes || 0) + 1
    // remove dislike if present
    if (site.dislikedBy.includes(user)) {
      site.dislikedBy = site.dislikedBy.filter(u => u !== user)
      site.dislikes = Math.max(0, (site.dislikes || 0) - 1)
    }
  }
  writeJSON(SITES_FILE, sites)
  res.json(site)
})

app.post('/api/sites/:id/dislike', authMiddleware, (req, res) => {
  const id = Number(req.params.id)
  const sites = readJSON(SITES_FILE)
  const site = sites.find(s => s.id === id)
  if (!site) return res.status(404).json({ error: 'site not found' })
  site.likedBy = site.likedBy || []
  site.dislikedBy = site.dislikedBy || []
  const user = req.user.username
  if (site.dislikedBy.includes(user)) {
    // remove dislike
    site.dislikedBy = site.dislikedBy.filter(u => u !== user)
    site.dislikes = Math.max(0, (site.dislikes || 0) - 1)
  } else {
    site.dislikedBy.push(user)
    site.dislikes = (site.dislikes || 0) + 1
    // remove like if present
    if (site.likedBy.includes(user)) {
      site.likedBy = site.likedBy.filter(u => u !== user)
      site.likes = Math.max(0, (site.likes || 0) - 1)
    }
  }
  writeJSON(SITES_FILE, sites)
  res.json(site)
})

app.use(express.static(__dirname))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
