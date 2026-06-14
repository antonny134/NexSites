
const tela = document.getElementById("tela")
const criar = document.getElementById("criar")
const meusites = document.getElementById("meusites")
const footer = document.getElementById("footer")

// HISTÓRICO DOS SITES
let historico = []
criar.addEventListener("click", function(){
    footer.classList.toggle(".fechar")
})
criar.addEventListener("click", function(){

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
                    <input type="text" placeholder="Ex: meusite.com.br" required id="url">
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
    const form = document.getElementById("formulario")

    form.addEventListener("submit", function(e){

        e.preventDefault()

        const nome = document.getElementById("nome").value
        const url = document.getElementById("url").value
        const descri = document.getElementById("descri").value

        // SALVA NO HISTÓRICO
        historico.push({
            nome,
            url,
            descri
        })

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


// MOSTRAR HISTÓRICO
meusites.addEventListener("click", function(){

    tela.innerHTML = `<h2 style="color:white; padding:15px;">SEUS SITES</h2>`

    if(historico.length === 0){
        tela.innerHTML += `
        <p style="color:white; padding:15px;">
            Nenhum site criado ainda.
        </p>
        `
    }

    historico.forEach( function(site){

        tela.innerHTML += `
        <div class="resultado">

            <h2>${site.nome}</h2>

            <strong>Site:</strong>

            <a href="${site.url}" target="_blank">
                ${site.url}
            </a>

            <p>
                <strong>Descrição:</strong>
                ${site.descri}
            </p>

        </div>
        `
    })
})
