let dadosClientes, codCli;
fetchClientes()
.then((res) => {
    dadosClientes = res.clientes;
    mostrarTabelaClientes(dadosClientes);
}); 

const addClienteFormBtn = document.getElementById("add-table-row-clientes");
const cancelarCriacaoClienteBtn = document.getElementById("cancel-btn-clientes");
addClienteFormBtn.addEventListener("click", mostrarFormCriacaoCliente);
cancelarCriacaoClienteBtn.addEventListener("click", mostrarFormCriacaoCliente);

const cancelarEdicaoClienteBtn = document.getElementById("cancel-btn-edit-clientes");
cancelarEdicaoClienteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarFormEdicaoCliente(null);
});

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keyup", () => {
    const cliArr = procurarClientes(searchBar.value.trim(), dadosClientes);
    mostrarTabelaClientes(cliArr);
});

const confirmarCriacaoClienteBtn = document.getElementById("confirm-btn-clientes");
confirmarCriacaoClienteBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const nomeEmpresaTextbox = document.getElementById("add-empresa-clientes");
    const nomeTextbox = document.getElementById("add-cliente-clientes");
    const tipoTextbox = document.getElementById("add-tipo-clientes");
    const enderecoTextbox = document.getElementById("add-endereco-clientes");
    const bairroTextbox = document.getElementById("add-bairro-clientes");
    const cidadeTextbox = document.getElementById("add-cidade-clientes");
    const estadoTextbox = document.getElementById("add-estado-clientes");
    const cepTextbox = document.getElementById("add-cep-clientes");
    const emailTextbox = document.getElementById("add-email-clientes");

    await criarCliente(
        nomeEmpresaTextbox.value.trim(),
        nomeTextbox.value.trim(),
        tipoTextbox.value.trim(),
        enderecoTextbox.value.trim(),
        bairroTextbox.value.trim(),
        cidadeTextbox.value.trim(),
        estadoTextbox.value.trim(),
        cepTextbox.value.trim(),
        emailTextbox.value.trim()
    );

    window.location.reload();
});

const confirmarAtualizacaoClienteBtn = document.getElementById("update-btn-edit-clientes");
confirmarAtualizacaoClienteBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const nomeEmpresaTextbox = document.getElementById("edit-empresa-clientes");
    const nomeTextbox = document.getElementById("edit-cliente-clientes");
    const tipoTextbox = document.getElementById("edit-tipo-clientes");
    const enderecoTextbox = document.getElementById("edit-endereco-clientes");
    const bairroTextbox = document.getElementById("edit-bairro-clientes");
    const cidadeTextbox = document.getElementById("edit-cidade-clientes");
    const estadoTextbox = document.getElementById("edit-estado-clientes");
    const cepTextbox = document.getElementById("edit-cep-clientes");
    const emailTextbox = document.getElementById("edit-email-clientes");

    await atualizarCliente(
        codCli,
        nomeEmpresaTextbox.value.trim(),
        nomeTextbox.value.trim(),
        tipoTextbox.value.trim(),
        enderecoTextbox.value.trim(),
        bairroTextbox.value.trim(),
        cidadeTextbox.value.trim(),
        estadoTextbox.value.trim(),
        cepTextbox.value.trim(),
        emailTextbox.value.trim()
    );

    window.location.reload();
});


/**
 * Mostra tabela de clientes com seus devidos dados.
 * @param {Array} dadosTabela - Lista de clientes a
 * serem mostrados.
 */
async function mostrarTabelaClientes(dadosTabela) {
    const tbody = document.getElementById("tbody-clientes");
    tbody.innerHTML = "";

    if (dadosTabela.length === 0) {
        tbody.innerHTML = `
            <h2 class="texto-404"> Nenhum cliente encontrado. </h2>`;
    }

    for (const cli of dadosTabela) {
        const coluna = document.createElement("tr");
        coluna.innerHTML = `
        <td> ${cli.nomeEmpresa} </td>
        <td> ${cli.nome} </td>
        <td> ${(!cli.tipo ? "" : cli.tipo)} </td>
        <td> ${cli.diaReg} </td>
        <td> ${(!cli.endereco ? "" : cli.endereco)} </td>
        <td> ${(!cli.bairro ? "" : cli.bairro)} </td>
        <td> ${cli.cidade} </td>
        <td> ${cli.estado} </td>
        <td> ${(!cli.cep ? "" : cli.cep)} </td>
        <td> ${(!cli.email ? "" : cli.email)} </td>
        `;

        const acoesCell = document.createElement("td");

        // Botão de exclusão
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("delete-btn");
        btnDelete.addEventListener("click", () => {
            if(confirmarExclusaoCliente())
                excluirCliente(cli.codCli);
        });
        btnDelete.innerHTML = '<i class="fa-solid fa-ban"> </i>';

        // Botão de edição
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("update-btn-icon");
        btnEdit.addEventListener("click", (event) => {
            event.preventDefault();
            codCli = cli.codCli;
            mostrarFormEdicaoCliente(cli);
        });
        btnEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"> </i>';

        acoesCell.appendChild(btnDelete);
        acoesCell.appendChild(btnEdit);

        coluna.appendChild(acoesCell);

        tbody.appendChild(coluna);
    }
}

/**
 * Pega todos os clientes cadastrados pela API e os insere na tabela.
 * @returns {object} - Resposta da API ou Objeto de erro.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */
async function fetchClientes() {
    return await fetch("/clientes")
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
        mostrarMensagemErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        return new Error(err);
    });
}

/**
 * Envia dados de clientes para sua criação à API.
 * @param {string} nomeEmpresa - Nome da empresa do cliente.
 * @param {string} nome - Nome do cliente.
 * @param {string} tipo - Tipo do cliente.
 * @param {string} endereco - Endereço da empresa do cliente.
 * @param {string} bairro - Bairro em que fica empresa do cliente.
 * @param {string} cidade - Cidade do cliente.
 * @param {string} estado - Estado do cliente.
 * @param {string} cep - CEP do cliente.
 * @param {string} email - Email de contato do cliente.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */
async function criarCliente(nomeEmpresa, nome, tipo, endereco, bairro, cidade,
    estado, cep, email) {
    return await fetch(`/clientes`, {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            nomeEmpresa,
            nome,
            tipo,
            endereco,
            bairro,
            cidade,
            estado,
            cep,
            email
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
 * Envia dados de cliente para atualização à API.
 * @param {Number} codCli - Código do cliente a ser alterado.
 * @param {string} nome - Nome do cliente.
 * @param {string} tipo - Tipo do cliente.
 * @param {string} endereco - Endereço da empresa do cliente.
 * @param {string} bairro - Bairro em que fica empresa do cliente.
 * @param {string} cidade - Cidade do cliente.
 * @param {string} estado - Estado do cliente.
 * @param {string} cep - CEP do cliente.
 * @param {string} email - Email de contato do cliente.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */
async function atualizarCliente(codCli, nomeEmpresa, nome, tipo, endereco,
    bairro, cidade, estado, cep, email) {
    return await fetch(`/clientes`, {
        method: "PUT",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            codCli,
            nomeEmpresa,
            nome,
            tipo,
            endereco,
            bairro,
            cidade,
            estado,
            cep,
            email
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
 * Remove cliente do banco de dados e mostra resposta.
 * @param {string} codCli - Código do cliente a ser excluído.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function excluirCliente(codCli) {
    const res = await fetch(`/clientes/${codCli}`, {
        method: "DELETE"
    });

    if (res.error) {
        mostrarMensagemErro(res.error);
        return new Error(res.error);
    }

    window.location.reload();
}

/**
 * Confirma se o usuário realmente deseja excluir o cliente.
 * @returns {boolean} - Retorna confirmação do usuário.
 */
function confirmarExclusaoCliente() {
    return confirm(
        "Você tem certeza que deseja excluir este cliente? Esta função é " +
        "irreversível."
    );
}

/**
 * Mostra o forms para edição de dados de cliente.
 * @param {object} cli - Dados do cliente a ser alterado.
 */
function mostrarFormEdicaoCliente(cli) {
    const editClienteForm = document.getElementById("edit-form-clientes");
    
    if (editClienteForm.style.display !== "block") {
        editClienteForm.style.display = "block";

        const nomeEmpresaTextbox = document.getElementById("edit-empresa-clientes");
        const nomeTextbox = document.getElementById("edit-cliente-clientes");
        const tipoTextbox = document.getElementById("edit-tipo-clientes");
        const enderecoTextbox = document.getElementById("edit-endereco-clientes");
        const bairroTextbox = document.getElementById("edit-bairro-clientes");
        const cidadeTextbox = document.getElementById("edit-cidade-clientes");
        const estadoTextbox = document.getElementById("edit-estado-clientes");
        const cepTextbox = document.getElementById("edit-cep-clientes");
        const emailTextbox = document.getElementById("edit-email-clientes");

        nomeEmpresaTextbox.value = cli.nomeEmpresa;
        nomeTextbox.value = cli.nome;
        tipoTextbox.value = cli.tipo;
        enderecoTextbox.value = cli.endereco;
        bairroTextbox.value = cli.bairro;
        cidadeTextbox.value = cli.cidade;
        estadoTextbox.value = cli.estado;
        cepTextbox.value = cli.cep;
        emailTextbox.value = cli.email;
    } else {
        editClienteForm.style.display = "none";
    }
}

/**
 * Mostra forms para cadastro de cliente.
 */
function mostrarFormCriacaoCliente() {
    const addClienteForm = document.getElementById("add-form-clientes");
    
    if (addClienteForm.style.display !== "block") {
        addClienteForm.style.display = "block";
    } else {
        addClienteForm.style.display = "none";
    }
}

/**
 * Retorna clientes com nome contendo uma dada string.
 * @param {string} str - String para busca de nome.
 * @param {Array} cliArr - Array com clientes a serem buscados.
 */
function procurarClientes(str, cliArr) {
    const clientes = [];
    for (const cli of cliArr) {
        if (cli.nome.includes(str)) 
            clientes.push(cli);
    }

    return clientes;
}