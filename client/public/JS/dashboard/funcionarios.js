let dadosFuncionarios;

mostrarTabelaFuncionarios();

/**
 * Mostra tabela de funcionários com seus devidos dados
 */
async function mostrarTabelaFuncionarios() {
    dadosFuncionarios = await fetchFuncionarios();

    if (dadosFuncionarios.error) {
        alert(dadosFuncionarios.error);
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
        });
        btnEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"> </i>';

        acoesCell.appendChild(btnDelete);
        acoesCell.appendChild(btnEdit);

        coluna.appendChild(acoesCell);

        tbody.appendChild(coluna)
    }
}

/**
 * Pega todos os funcionários cadastrados pela API e
 * os insere na tabela
 * @returns {object} - Resposta da API ou Objeto de erro
 */
async function fetchFuncionarios() {
    try {
        const res = await fetch("https://bonzitech-tcc.onrender.com/api/usuarios");
        return res.json();
    } catch(error) {
        console.log(error);
        return { error: "Erro ao conectar com a API. Tente novamente mais tarde ou contate o suporte." };
    }
}

/**
 * Envia dados de funcionário para criação à api
 * @param {string} permisssoes - Permissões do funcionário
 * @param {string} nome - Nome do novo funcionário
 * @param {string} email - Email do novo funcionário
 * @param {string} senha - Senha do novo funcionário
 * @returns {object} - Mensagem de erro ou sucesso
 */
async function criarFuncionario(permisssoes, nome, email, senha) {
    try {

    } catch(error) {
        console.log(error);
        return { error: "Erro ao conectar com a API. Tente novamente mais tarde ou contate o suporte." };
    }
}

/**
 * Envia dados de funcionário para atualização à API
 * @param {string} permisssoes - Permissões do funcionário
 * @param {string} nome - Nome funcionário
 * @param {string} email - Email funcionário
 * @param {string} confSenha - Senha do usuário a alterar funcionário
 * @returns {object} - Mensagem de erro ou sucesso
 */
async function atualizarFuncionario(permisssoes, nome, email, confSenha) {
    try {

    } catch(error) {
        console.log(error);
        return { error: "Erro ao conectar com a API. Tente novamente mais tarde ou contate o suporte." };
    }
}

/**
 * Inativa funcionário no banco de dados
 * @param {string} codUsu - Código do funcionário a ser inativado
 * @returns {object} - Mensagem de erro ou sucesso
 */
async function inativarFuncionario(codUsu) {
    try {

    } catch(error) {
        console.log(error);
        return { error: "Erro ao conectar com a API. Tente novamente mais tarde ou contate o suporte." };
    }
}

/**
 * Mostra o forms para edição de funcionário
 * @param {object} func - Dados do funcionário a ser alterado
 */
function mostrarFormEdicaoFuncionario(func) {

}