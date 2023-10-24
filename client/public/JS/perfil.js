fetchSessao()
.then(async (res) => {
    const usuarioData = await fetchFuncionarios(res.codUsuario);
    mostrarDadosUsuario(usuarioData.usuario);
});


/**
 * Retorna dados da sessão do usuário.
 * @returns {object} - Dados da sessão.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function fetchSessao() {
    return await fetch("/sessao")
    .then((res) => res.json())
    .then((res) => {
        if (res.error) {
            mostrarMensagemErro(res.error);
            return new Error(err);
        }

        return res;
    })
    .catch((err) => {
        console.error(err);
        mostrarMensagemErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        return new Error(err);
    });
}

/**
 * Retorna dados do usuário logado.
 * @param {Number} codUsu - Código do usuário logado.
 * @returns {object} - Dados do usuário logado.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function fetchFuncionarios(codUsu) {
    return await fetch(`/funcionarios/${codUsu}`)
    .then((res) => res.json())
    .then((res) => {
        if (res == null) 
            return null

        if (res.error) {
            mostrarMensagemErro(res.error);
            return new Error(res.error);
        }

        return res;
    })
    .catch((err) => {
        console.error(err);
        mostrarMensagemErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        return new Error(err);
    });
}

/**
 * Mostra os dados do usuário logado no HTML.
 * @param {object} usuario - Dados estruturados do usuário.
 */
function mostrarDadosUsuario(usuario) {
    const nomeHolder = document.getElementById("nome-usuario");
    const funcaoHolder = document.getElementById("funcao-usuario");
    const emailHolder = document.getElementById("email-usuario");

    nomeHolder.textContent = usuario.nome;
    funcaoHolder.textContent = usuario.permissoes;
    emailHolder.textContent = usuario.email;
}

/**
 * Mostra uma mensagem de erro ao usuário.
 * @param {string} erro - Erro a ser mostrado.
 */
function mostrarMensagemErro(erro) {
    const mensagemErroContainer = document.getElementById("mensagem-erro-container");
    const mensagemErro = document.getElementById("mensagem-erro");

    mensagemErroContainer.style.display = "block";

    mensagemErro.textContent = erro;

    setTimeout(() => {
        mensagemErroContainer.style.display = "none";
    }, 5000);
}