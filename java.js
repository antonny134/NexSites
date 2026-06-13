 const tela = document.getElementById("tela")
const criar = document.getElementById("criar")
criar.addEventListener("click", function(){
    tela.innerHTML = `
<nav class="tela2">
    <div class="pts">
        <div class="logo2">
            <h3>Lance seu site</h3>
        </div>

        <div class="ps">
            <form id="formulario">

                <label>Nome</label>
                <input type="text" placeholder="Ex: meusite" required id="nome">
                <br><br>

                <label>Url</label>
                <input type="text" placeholder="Ex: meusite.com.br" required id="url">
                <br><br>

                <label>Descrição</label><br>
                <textarea placeholder="Foi feito para você!" required id="descri"></textarea>
                <br><br>

                <button id="enviar" type="submit">Enviar</button>

            </form>
        </div>
    </div>
</nav>
`   
    const form = document.getElementById("formulario")
    const ok = document.getElementById("enviar")
    form.addEventListener('submit', function(e){
    e.preventDefault()

    const nome = document.getElementById("nome").value
    const url = document.getElementById("url").value
    const descri = document.getElementById("descri").value
    tela.innerHTML = `
    
    <div class="resultado">

        <h2>${nome}</h2>

        <strong>Site:</strong>

        <a href="${url}" target="_blank">
            ${url}
        </a>

        <p>
            <strong>Descrição:</strong>
            ${descri}
        </p>

    </div>
    `
    })
})
const meusites = document.getElementById("meusites")
meusites.addEventListener("click", function(){
    tela.innerHTML = `
    <h3>Seus Sites </h3>
    <div class="resultado">

        <h2>${nome}</h2>

        <strong>Site:</strong>

        <a href="${url}" target="_blank">
            ${url}
        </a>

        <p>
            <strong>Descrição:</strong>
            ${descri}
        </p>

    </div>
    `
})