// Script para carregar sites populares na inicialização
async function loadPopularSites() {
  try {
    // Aguardar que as funções necessárias estejam disponíveis
    let attempts = 0;
    while (typeof loadAndShowSites === 'undefined' && attempts < 10) {
      await new Promise(r => setTimeout(r, 100));
      attempts++;
    }
    
    if (typeof loadAndShowSites === 'function' && typeof showSitesList === 'function') {
      // Tentar detectar se o servidor está disponível
      try {
        const res = await fetch('/api/sites/popular');
        if (res.ok) {
          const sites = await res.json();
          window.showSitesList(sites);
          return;
        }
      } catch (e) {
        // Se houver erro, tentar usar a função normal que tem fallback
      }
      
      // Fallback: usar a função loadAndShowSites
      window.hasServer = true;
      await window.loadAndShowSites();
    }
  } catch (e) {
    console.error('Erro ao carregar sites populares:', e);
  }
}

// Executar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPopularSites);
} else {
  loadPopularSites();
}


