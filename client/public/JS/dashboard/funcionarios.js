let dadosFuncionarios, codFunc;

mostrarTabelaFuncionarios();

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

const confirmarCriacaoFuncionarioBtn = document.getElementById("confirm-criacao-funcionario-btn");
// Criação de funcionário
confirmarCriacaoFuncionarioBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const permissaoTextbox = document.getElementById("add-funcionario-permission");
    const nomeTextbox = document.getElementById("add-funcionario-name");
    const emailTextbox = document.getElementById("add-funcionario-email");
    const senhaTextbox = document.getElementById("add-funcionario-password");

    const res = await criarFuncionario(
        permissaoTextbox.value.trim(),
        nomeTextbox.value.trim(),
        emailTextbox.value.trim(),
        senhaTextbox.value.trim()
    );

    if (res.error) {
        mostrarMensagemErro(res.error);
        return;
    }

    window.location.reload();
});

const confirmarAtualizacaoFuncionarioBtn = document.getElementById("update-funcionario-btn");
// Edição de funcionário
confirmarAtualizacaoFuncionarioBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const permissaoTextbox = document.getElementById("edit-funcionario-permission");
    const nomeTextbox = document.getElementById("edit-funcionario-name");
    const emailTextbox = document.getElementById("edit-funcionario-email");
    const confSenhaTextbox = document.getElementById("edit-funcionario-password");

    const res = await atualizarFuncionario(
        codFunc,
        permissaoTextbox.value.trim(),
        nomeTextbox.value.trim(),
        emailTextbox.value.trim(),
        confSenhaTextbox.value.trim()
    );

    if (res.error) {
        mostrarMensagemErro(res.error);
        return;
    }

    window.location.reload();
});


/**
 * Mostra tabela de funcionários com seus devidos dados
 */
async function mostrarTabelaFuncionarios() {
    dadosFuncionarios = await fetchFuncionarios();

    if (dadosFuncionarios.error) {
        mostrarMensagemErro(dadosFuncionarios.error);
        return;
    }

    const tbody = document.getElementById("tbody-funcionarios");
    for (const func of dadosFuncionarios) {
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
 * os insere na tabela
 * @returns {object} - Resposta da API ou Objeto de erro
 */
async function fetchFuncionarios() {
    const res = await fetch(`/funcionarios`);
    return res.json();
}

/**
 * Envia dados de funcionário para criação à api
 * @param {string} permissoes - Permissões do funcionário
 * @param {string} nome - Nome do novo funcionário
 * @param {string} email - Email do novo funcionário
 * @param {string} senha - Senha do novo funcionário
 * @returns {object} - Mensagem de erro ou sucesso
 */
async function criarFuncionario(permissoes, nome, email, senha) {
    const res = await fetch(`/funcionarios`, {
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
    return res.json();
}

/**
 * Envia dados de funcionário para atualização à API
 * @param {string} permissoes - Permissões do funcionário
 * @param {string} nome - Nome funcionário
 * @param {string} email - Email funcionário
 * @param {string} confSenha - Senha do usuário a alterar funcionário
 * @returns {object} - Mensagem de erro ou sucesso
 */
async function atualizarFuncionario(codUsuario, permissoes, nome, email, confSenha) {
    const res = await fetch(`/funcionarios`, {
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
    return res.json();
}

/**
 * Inativa funcionário no banco de dados e mostra resposta
 * @param {string} codUsu - Código do funcionário a ser inativado
 */
async function inativarFuncionario(codUsu) {
    const res = await fetch(`/funcionarios/${codUsu}`, {
        method: "DELETE"
    });

    if (res.error) {
        mostrarMensagemErro(res.error);
        return;
    }

    window.location.reload();
}

/**
 * Mostra o forms para edição de funcionário
 * @param {object} func - Dados do funcionário a ser alterado
 */
function mostrarFormEdicaoFuncionario(func) {
    const editFuncionarioForm = document.getElementById("edit-funcionario-form");
    
    if (editFuncionarioForm.style.display === "none") {
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
 * Mostra forms para criação de funcionário
 */
function mostrarFormCriacaoFuncionario() {
    const addFuncionarioForm = document.getElementById("add-funcionario-form");
    
    if (addFuncionarioForm.style.display === "none") {
        addFuncionarioForm.style.display = "block";
    } else {
        addFuncionarioForm.style.display = "none";
    }
}