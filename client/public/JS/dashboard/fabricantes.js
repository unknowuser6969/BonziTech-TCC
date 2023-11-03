let dadosFabricantes, codFab;
fetchFabricantes()
.then((res) => {
    dadosFabricantes = res;
    mostrarTabelaFabricantes(dadosFabricantes);
}); 

const addFabricanteFormBtn = document.getElementById("add-table-row-fabricantes");
const cancelarCriacaoFabricanteBtn = document.getElementById("cancel-btn-fabricantes");
addFabricanteFormBtn.addEventListener("click", mostrarFormCriacaoFabricante);
cancelarCriacaoFabricanteBtn.addEventListener("click", mostrarFormCriacaoFabricante);

const cancelarEdicaoFabricanteBtn = document.getElementById("cancel-btn-edit-fabricantes");
cancelarEdicaoFabricanteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarFormEdicaoFabricante(null);
});

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keyup", () => {
    const fabArr = procurarFabricantes(searchBar.value.trim(), dadosFabricantes);
    mostrarTabelaFabricantes(fabArr);
});

const confirmarCriacaoFabricanteBtn = document.getElementById("confirm-btn-fabricantes");
confirmarCriacaoFabricanteBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const nomeTextbox = document.getElementById("add-fabricante-fabricantes");
    const nomeContatoTextbox = document.getElementById("add-nome-contato-fabricantes");
    const razaoSocialTextbox = document.getElementById("add-razao-social-fabricantes");
    const telefoneTextbox = document.getElementById("add-telefone-fabricantes");
    const celularTextbox = document.getElementById("add-celular-fabricantes");
    const faxTextbox = document.getElementById("add-fax-fabricantes");
    const enderecoTextbox = document.getElementById("add-endereco-fabricantes");
    const cidadeTextbox = document.getElementById("add-cidade-fabricantes");
    const estadoTextbox = document.getElementById("add-estado-fabricantes");
    const cepTextbox = document.getElementById("add-cep-fabricantes");

    await criarFabricante(
        nomeTextbox.value.trim(),
        nomeContatoTextbox.value.trim(),
        razaoSocialTextbox.value.trim(),
        telefoneTextbox.value.trim(),
        celularTextbox.value.trim(),
        faxTextbox.value.trim(),
        enderecoTextbox.value.trim(),
        cidadeTextbox.value.trim(),
        estadoTextbox.value.trim(),
        cepTextbox.value.trim()
    );

    window.location.reload();
});

const confirmarAtualizacaoFabricanteBtn = document.getElementById("confirm-btn-edit-fabricantes");
confirmarAtualizacaoFabricanteBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const nomeTextbox = document.getElementById("edit-fabricante-fabricantes");
    const nomeContatoTextbox = document.getElementById("edit-nome-contato-fabricantes");
    const razaoSocialTextbox = document.getElementById("edit-razao-social-fabricantes");
    const telefoneTextbox = document.getElementById("edit-telefone-fabricantes");
    const celularTextbox = document.getElementById("edit-celular-fabricantes");
    const faxTextbox = document.getElementById("edit-fax-fabricantes");
    const enderecoTextbox = document.getElementById("edit-endereco-fabricantes");
    const cidadeTextbox = document.getElementById("edit-cidade-fabricantes");
    const estadoTextbox = document.getElementById("edit-estado-fabricantes");
    const cepTextbox = document.getElementById("edit-cep-fabricantes");

    await atualizarFabricante(
        codFab,
        nomeTextbox.value.trim(),
        nomeContatoTextbox.value.trim(),
        razaoSocialTextbox.value.trim(),
        telefoneTextbox.value.trim(),
        celularTextbox.value.trim(),
        faxTextbox.value.trim(),
        enderecoTextbox.value.trim(),
        cidadeTextbox.value.trim(),
        estadoTextbox.value.trim(),
        cepTextbox.value.trim()
    );

    window.location.reload();
});


/**
 * Mostra tabela de fabricantes com seus devidos dados.
 * @param {Array} dadosTabela - Lista de fabricantes a
 * serem mostrados.
 */
async function mostrarTabelaFabricantes(dadosTabela) {
    const tbody = document.getElementById("tbody-fabricantes");
    tbody.innerHTML = "";

    if (dadosTabela.length === 0) {
        tbody.innerHTML = `
            <h2 class="texto-404"> Nenhum fabricante encontrado. </h2>`;
    }

    for (const fab of dadosTabela) {
        const coluna = document.createElement("tr");
        coluna.innerHTML = `
        <td> ${fab.nome} </td>
        <td> ${(!fab.nomeContato ? "" : fab.nomeContato)} </td>
        <td> ${(!fab.razaoSocial ? "" : fab.razaoSocial)} </td>
        <td> ${(!fab.telefone ? "" : fab.telefone)} </td>
        <td> ${(!fab.fax ? "" : fab.fax)} </td>
        <td> ${(!fab.celular ? "" : fab.celular)} </td>
        <td> ${(!fab.endereco ? "" : fab.endereco)} </td>
        <td> ${(!fab.cidade ? "" : fab.cidade)} </td>
        <td> ${(!fab.estado ? "" : fab.estado)} </td>
        <td> ${(!fab.cep ? "" : fab.cep)} </td>
        `;

        const acoesCell = document.createElement("td");

        // Botão de inativação 
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("delete-btn");
        btnDelete.addEventListener("click", () => {
            if(confirmarExclusaoFabricante())
                excluirFabricante(fab.codFab);
        });
        btnDelete.innerHTML = '<i class="fa-solid fa-ban"> </i>';

        // Botão de edição 
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("update-btn-icon");
        btnEdit.addEventListener("click", (event) => {
            event.preventDefault();
            mostrarFormEdicaoFabricante(fab);
            codFab = fab.codFab;
        });
        btnEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"> </i>';

        acoesCell.appendChild(btnDelete);
        acoesCell.appendChild(btnEdit);

        coluna.appendChild(acoesCell);

        tbody.appendChild(coluna);
    }
}

/**
 * Pega todos os fabricantes cadastrados pela API e
 * os insere na tabela.
 * @returns {object} - Resposta da API ou Objeto de erro.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function fetchFabricantes() {
    return await fetch("/fabricantes")
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
 * Envia dados de fabricantes para criação à API.
 * @param {string} nome - Nome do fabricante.
 * @param {string} nomeContato - Nome de contato do fabricante.
 * @param {string} razaoSocial - Razão social do fabricante.
 * @param {string} telefone - Número de telefone dofabricante.
 * @param {string} celular - Número de contato pessoaldo fabricante.
 * @param {string} fax - Fax do fabricante.
 * @param {string} endereco - Endereço da sede física do fabricante.
 * @param {string} cidade - Cidade de atuação dofabricante.
 * @param {string} estado - Estado de atuação do fabricante.
 * @param {string} cep - CEP do fabricante.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */
async function criarFabricante(nome, nomeContato, razaoSocial, telefone, celular, 
    fax, endereco, cidade, estado, cep) {
    return await fetch(`/fabricantes`, {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            nome,
            nomeContato,
            razaoSocial,
            telefone,
            celular,
            fax,
            endereco,
            cidade,
            estado,
            cep
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
 * Envia dados de fabricantes para atualização à API.
 * @param {Number} codFab - Código do fabricante a ser alterado.
 * @param {string} nome - Nome do fabricante.
 * @param {string} nomeContato - Nome de contato do fabricante.
 * @param {string} razaoSocial - Razão social do fabricante.
 * @param {string} telefone - Número de telefone dofabricante.
 * @param {string} celular - Número de contato pessoaldo fabricante.
 * @param {string} fax - Fax do fabricante.
 * @param {string} endereco - Endereço da sede física do fabricante.
 * @param {string} cidade - Cidade de atuação dofabricante.
 * @param {string} estado - Estado de atuação do fabricante.
 * @param {string} cep - CEP do fabricante.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */
async function atualizarFabricante(codFab, nome, nomeContato, razaoSocial, telefone,
    celular, fax, endereco, cidade, estado, cep) {
    return await fetch(`/fabricantes`, {
        method: "PUT",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            codFab,
            nome,
            nomeContato,
            razaoSocial,
            telefone,
            celular,
            fax,
            endereco,
            cidade,
            estado,
            cep
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
 * Remove fabricante do banco de dados e mostra resposta.
 * @param {string} codFab - Código do fabricante a ser excluído.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function excluirFabricante(codFab) {
    const res = await fetch(`/fabricantes/${codFab}`, {
        method: "DELETE"
    });

    if (res.error) {
        mostrarMensagemErro(res.error);
        return new Error(res.error);
    }

    window.location.reload();
}

/**
 * Confirma se o usuário realmente deseja excluir o fabricante.
 * @returns {boolean} - Retorna confirmação do usuário.
 */
function confirmarExclusaoFabricante() {
    return confirm(
        "Você tem certeza que deseja excluir este fabricante? Esta função é " +
        "irreversível."
    );
}

/**
 * Mostra o forms para edição de dados de fabricante.
 * @param {object} fab - Dados do fabricante a ser alterado.
 */
function mostrarFormEdicaoFabricante(fab) {
    const editFabricanteForm = document.getElementById("edit-form-fabricantes");
    
    if (editFabricanteForm.style.display !== "block") {
        editFabricanteForm.style.display = "block";

        const nomeTextbox = document.getElementById("edit-fabricante-fabricantes");
        const nomeContatoTextbox = document.getElementById("edit-nome-contato-fabricantes");
        const razaoSocialTextbox = document.getElementById("edit-razao-social-fabricantes");
        const telefoneTextbox = document.getElementById("edit-telefone-fabricantes");
        const celularTextbox = document.getElementById("edit-celular-fabricantes");
        const faxTextbox = document.getElementById("edit-fax-fabricantes");
        const enderecoTextbox = document.getElementById("edit-endereco-fabricantes");
        const cidadeTextbox = document.getElementById("edit-cidade-fabricantes");
        const estadoTextbox = document.getElementById("edit-estado-fabricantes");
        const cepTextbox = document.getElementById("edit-cep-fabricantes");

        nomeTextbox.value = fab.nome;
        nomeContatoTextbox.value = fab.nomeContato;
        razaoSocialTextbox.value = fab.razaoSocial;
        telefoneTextbox.value = fab.telefone;
        celularTextbox.value = fab.celular;
        faxTextbox.value = fab.fax;
        enderecoTextbox.value = fab.endereco;
        cidadeTextbox.value = fab.cidade;
        estadoTextbox.value = fab.estado;
        cepTextbox.value = fab.cep;
    } else {
        editFabricanteForm.style.display = "none";
    }
}

/**
 * Mostra forms para cadastro de fabricante.
 */
function mostrarFormCriacaoFabricante() {
    const addFabricanteForm = document.getElementById("add-form-fabricantes");
    
    if (addFabricanteForm.style.display !== "block") {
        addFabricanteForm.style.display = "block";
    } else {
        addFabricanteForm.style.display = "none";
    }
}

/**
 * Retorna fabricantes com nome contendo uma dada string.
 * @param {string} str - String para busca de nome.
 * @param {Array} fabArr - Array com fabricantes a serem buscados.
 */
function procurarFabricantes(str, fabArr) {
    const fabricantes = [];
    for (const fab of fabArr) {
        if (fab.nome.includes(str)) 
            fabricantes.push(fab);
    }

    return fabricantes;
}