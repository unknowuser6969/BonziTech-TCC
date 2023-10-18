let dadosFuncionarios, codFunc;
fetchFuncionarios()
.then((res) => {
    dadosFuncionarios = res;
    mostrarTabelaFuncionarios(dadosFuncionarios);
}); 

const addFuncionarioFormBtn = document.getElementById("add-funcionario-table-row");
const cancelarCriacaoFuncionarioIcone = document.getElementById("cancel-funcionario-post-icon");
const cancelarCriacaoFuncionarioBtn = document.getElementById("cancel-criacao-funcionario-btn");
addFuncionarioFormBtn.addEventListener("click", mostrarFormCriacaoFuncionario);
cancelarCriacaoFuncionarioIcone.addEventListener("click", mostrarFormCriacaoFuncionario);
cancelarCriacaoFuncionarioBtn.addEventListener("click", mostrarFormCriacaoFuncionario);

const cancelarEdicaoFuncionarioIcone = document.getElementById("cancel-funcionario-edit-icon");
const cancelarEdicaoFuncionarioBtn = document.getElementById("edit-funcionario-cancel-btn");
cancelarEdicaoFuncionarioIcone.addEventListener("click", mostrarFormEdicaoFuncionario);
cancelarEdicaoFuncionarioBtn.addEventListener("click", mostrarFormEdicaoFuncionario);

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keyup", () => {
    const funcArr = procurarFuncionarios(searchBar.value.trim(), dadosFuncionarios);
    mostrarTabelaFuncionarios(funcArr);
});

const confirmarCriacaoFuncionarioBtn = document.getElementById("confirm-criacao-funcionario-btn");
confirmarCriacaoFuncionarioBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const permissaoTextbox = document.getElementById("add-funcionario-permission");
    const nomeTextbox = document.getElementById("add-funcionario-name");
    const emailTextbox = document.getElementById("add-funcionario-email");
    const senhaTextbox = document.getElementById("add-funcionario-password");

    await criarFuncionario(
        permissaoTextbox.value.trim(),
        nomeTextbox.value.trim(),
        emailTextbox.value.trim(),
        senhaTextbox.value.trim()
    );

    window.location.reload();
});

const confirmarAtualizacaoFuncionarioBtn = document.getElementById("update-funcionario-btn");
confirmarAtualizacaoFuncionarioBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const permissaoTextbox = document.getElementById("edit-funcionario-permission");
    const nomeTextbox = document.getElementById("edit-funcionario-name");
    const emailTextbox = document.getElementById("edit-funcionario-email");
    const confSenhaTextbox = document.getElementById("edit-funcionario-password");

    await atualizarFuncionario(
        codFunc,
        permissaoTextbox.value.trim(),
        nomeTextbox.value.trim(),
        emailTextbox.value.trim(),
        confSenhaTextbox.value.trim()
    );

    window.location.reload();
});


/**
 * Mostra tabela de funcionários com seus devidos dados.
 * @param {Array} dadosTabela - Lista de funcionários a
 * serem mostrados.
 */
async function mostrarTabelaFuncionarios(dadosTabela) {
    const tbody = document.getElementById("tbody-funcionarios");
    tbody.innerHTML = "";

    if (dadosTabela.length === 0) {
        tbody.innerHTML = `
            <h2 class="texto-404"> Nenhum funcionário encontrado. </h2>`;
    }

    for (const func of dadosTabela) {
        const coluna = document.createElement("tr");
        coluna.innerHTML = `
        <td> ${func.nome} </td>
        <td> ${func.email} </td>
        `;

        const acoesCell = document.createElement("td");

        // Botão de inativação de funcionário
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("delete-btn");
        btnDelete.addEventListener("click", () => {
            if(confirmarInativacaoFuncionario())
                inativarFuncionario(func.codUsuario);
        });
        btnDelete.innerHTML = '<i class="fa-solid fa-ban"> </i>';

        // Botão de edição de funcionário
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("update-btn-icon");
        btnEdit.addEventListener("click", (event) => {
            event.preventDefault();
            mostrarFormEdicaoFuncionario(func);
            codFunc = func.codUsuario;
        });
        btnEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"> </i>';

        acoesCell.appendChild(btnDelete);
        acoesCell.appendChild(btnEdit);

        coluna.appendChild(acoesCell);

        tbody.appendChild(coluna);
    }
}

/**
 * Pega todos os funcionários cadastrados pela API e
 * os insere na tabela.
 * @returns {object} - Resposta da API ou Objeto de erro.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function fetchFuncionarios() {
    return await fetch("/funcionarios")
    .then((res) => res.json())
    .then((res) => {
        if (res.error) {
            mostrarMensagemErro(res.error);
            return new Error(res.error);
        }

        return res;
    })
    .catch((err) => {
        mostrarMensagemErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        return new Error(err);
    });
}

/**
 * Envia dados de funcionário para criação à api.
 * @param {string} permissoes - Permissões do funcionário.
 * @param {string} nome - Nome do novo funcionário.
 * @param {string} email - Email do novo funcionário.
 * @param {string} senha - Senha do novo funcionário.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function criarFuncionario(permissoes, nome, email, senha) {
    return await fetch(`/funcionarios`, {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            permissoes,
            nome,
            email,
            senha
        })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.error) {
            mostrarMensagemErro(res.error);
            return new Error(res.error);
        }

        return res;
    })
    .catch((err) => {
        mostrarMensagemErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        return new Error(err);
    });
}

/**
 * Envia dados de funcionário para atualização à API.
 * @param {string} permissoes - Permissões do funcionário.
 * @param {string} nome - Nome funcionário.
 * @param {string} email - Email funcionário.
 * @param {string} confSenha - Senha do usuário a alterar funcionário.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function atualizarFuncionario(codUsuario, permissoes, nome, email, confSenha) {
    return await fetch(`/funcionarios`, {
        method: "PUT",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            codUsuario,
            permissoes,
            nome,
            email,
            senha: confSenha
        })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.error) {
            mostrarMensagemErro(res.error);
            return new Error(res.error);
        }

        return res;
    })
    .catch((err) => {
        mostrarMensagemErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        return new Error(err);
    });
}

/**
 * Inativa funcionário no banco de dados e mostra resposta.
 * @param {string} codUsu - Código do funcionário a ser inativado.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function inativarFuncionario(codUsu) {
    const res = await fetch(`/funcionarios/${codUsu}`, {
        method: "DELETE"
    });

    if (res.error) {
        mostrarMensagemErro(res.error);
        return new Error(res.error);
    }

    window.location.reload();
}

/**
 * Confirma se o usuário realmente deseja inativar o funcionário.
 * @returns {boolean} - Retorna confirmação do usuário
 */
function confirmarInativacaoFuncionario() {
    return confirm("Você tem certeza que deseja inativar este funcionário?");
}

/**
 * Mostra o forms para edição de funcionário.
 * @param {object} func - Dados do funcionário a ser alterado.
 */
function mostrarFormEdicaoFuncionario(func) {
    const editFuncionarioForm = document.getElementById("edit-funcionario-form");
    
    if (editFuncionarioForm.style.display !== "block") {
        editFuncionarioForm.style.display = "block";

        const permissaoTextbox = document.getElementById("edit-funcionario-permission");
        const nomeTextbox = document.getElementById("edit-funcionario-name");
        const emailTextbox = document.getElementById("edit-funcionario-email");

        permissaoTextbox.value = func.permissoes;
        nomeTextbox.value = func.nome;
        emailTextbox.value = func.email;
    } else {
        editFuncionarioForm.style.display = "none";
    }
}

/**
 * Mostra forms para criação de funcionário.
 */
function mostrarFormCriacaoFuncionario() {
    const addFuncionarioForm = document.getElementById("add-funcionario-form");
    
    if (addFuncionarioForm.style.display !== "block") {
        addFuncionarioForm.style.display = "block";
    } else {
        addFuncionarioForm.style.display = "none";
    }
}

/**
 * Retorna funcionários com nome contendo uma
 * dada string.
 * @param {string} str - String para busca de nome.
 * @param {Array} funcArr - Array com funcionários 
 * a serem buscados.
 */
function procurarFuncionarios(str, funcArr) {
    const funcionarios = [];
    for (const func of funcArr) {
        if (func.nome.includes(str)) 
            funcionarios.push(func);
    }

    return funcionarios;
}