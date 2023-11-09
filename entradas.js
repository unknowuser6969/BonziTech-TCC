let dadosEntradas, codEntd;
fetchEntradas()
.then((res) => {
    dadosEntradas = res.entradas;
    mostrarTabelaEntradas(dadosEntradas);
});

const addEntradasFormBtn = document.getElementById("add-table-row-entradas");
const cancelarCriacaoEntradasBtn = document.getElementById("cancel-btn-entradas");
addEntradasFormBtn.addEventListener("click", mostrarFormCriacaoEntradas);
cancelarCriacaoEntradasBtn.addEventListener("click", mostrarFormCriacaoEntradas);

const cancelarEdicaoEntradasBtn = document.getElementById("cancel-btn-edit-entradas");
cancelarEdicaoEntradasBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarFormCriacaoEntradas(null);
});

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", () =>{
    const cliArr = procurarEntrada(searchBar.value.trim(), dadosEntradas);
    mostrarTabelaEntradas(cliArr);
});

const confirmarCriacaoEntradasBtn = document.getElementById("searchBar");
confirmarCriacaoEntradasBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const CodigoTextbox = document.getElementById("add-codigo-entradas");
    const DataDaVendaTextbox = document.getElementById("add-data-venda-entradas");
    const QuantidadeTextbox = document.getElementById("add-quantidade-entradas");
    const NotaFiscalTextbox = document.getElementById("add-nota-fiscal-entradas");
    const ValorTotalTextbox = document.getElementById("add-valor-total-entradas");

    await criarEntradas(
        CodigoTextbox.value.trim(),
        DataDaVendaTextbox.value.trim(),
        QuantidadeTextbox.value.trim(),
        NotaFiscalTextbox.value.trim(),
        ValorTotalTextbox.value.trim()         
    );
    
    window.location.reload();
});

const confirmacaoAtualizacaoEntradasBtn = document.getElementById("serchBar");
confirmacaoAtualizacaoEntradasBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const CodigoTextbox = document.getElementById("add-codigo-entradas");
    const DataDaVendaTextbox = document.getElementById("add-data-venda-entradas");
    const QuantidadeTextbox = document.getElementById("add-Quantidade-entradas");
    const NotaFiscalTextbox = document.getElementById("add-nota-fiscal-entradas");
    const ValorTotalTextbox = document.getElementById("add-Valor-Total-entradas");

    await atualizarEntradas(
        codEntd,
        CodigoTextbox.value.trim(),
        DataDaVendaTextbox.value.trim(),
        QuantidadeTextbox.value.trim(),
        NotaFiscalTextbox.value.trim(),
        ValorTotalTextbox.value.trim()   
    );

    window.location.reload();  
});


/**
 * Mostra tabela de entrada com seus devidos dados.
 * @param {Array} dadosTabela - Lista de entradas a
 * serem mostrados.
 */

async function mostrarTabelaEntradas(dadosEntradas) {
    const tbody = document.getElementById("tbody-entradas");
    tbody.innerHTML = "";

    if (dadosEntradas.length === 0){
        tbody.innerHTML = `
        <h2 class="texto-404"> Nenhum cliente encontrado. </h2>`;
    }

    for (const cli of dadosTabela){
        const coluna = document.createElement("tr");
        coluna.innerHTML = `
        <td> ${(!cli.Codigo ? "" : cli.Codigo)} </td>
        <td> ${cli.DataDaVenda} </td>
        <td> ${(!cli.Quantidade ? "" : cli.Quantidade)} </td>
        <td> ${(!cli.NotaFiscal ? "" : cli.NotaFiscal)} </td>
        <td> ${(!cli.ValorTotal ? "" : cli.ValorTotal)} </td>
        `;

        const acoesCell = document.createElement("td");

        // Botão de exclusão
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("delete-btn");
        btnDelete.addEventListener("click", () => {
            if(confirmarExclusaoCliente())
                excluirCliente(cli.codEntd);
        });
        btnDelete.innerHTML = '<i class="fa-solid fa-ban"> </i>';

        // Botão de edição
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("update-btn-icon");
        btnEdit.addEventListener("click", (event) => {
            event.preventDefault();
            codEntd = cli.codEntd;
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

async function fetchEntradas(){
    return await fetch("/entradas")
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
        mostrarMensagemErro("Error ao conecErro ao conectar com o servidor. Tente novamente mais tarde.");
        return new Error(err);
    });
}

/**
 * Envia dados de entrada para sua criação à API.
 * @param {Number} Codigo - Codigo da entrada.
 * @param {string} DataDaVenda - Data da venda.
 * @param {Number} Quantidade - Quantidade que vendeu .
 * @param {string} NotaFiscal - Nota fiscal da entrada.
 * @param {Number} ValorTotal - Valor total da entrada.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */

async function criarEntradas(Codigo, DataDaVenda, Quantidade, NotaFiscal, ValorTotal) {
    return await fetch(`/entradas`, {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            Codigo,
            DataDaVenda,
            Quantidade,
            NotaFiscal,
            ValorTotal
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
        mostrarMensagemErro("Erro ao conectar com o servidor. Tente novamente mais tarde.o ");
        return new Error(err);
    });
}

/**
 * Envia dados de cliente para atualização à API.
 * @param {Number} codEntd - Código do cliente a ser alterado.
 * @param {string} Codigo - Codigo da entrada.
 * @param {string} DataDaVenda - Data da venda.
 * @param {string} Quantidade - Quantidade que vendeu .
 * @param {string} NotaFiscal - Nota fiscal da entrada.
 * @param {string} ValorTotal - Valor total da entrada.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */

async function atualizarEntradas(codEntd, Codigo, DataDaVenda, Quantidade, NotaFiscal, ValorTotal) {
    return await fetch(`/entradas`, {
        method: "PUT",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            codEntd,
            Codigo,
            DataDaVenda,
            Quantidade,
            NotaFiscal,
            ValorTotal
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
 * @param {string} codEntd - Código do cliente a ser excluído.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function excluirEntrada(codEntd) {
    const res = await fetch(`/entradas/${codEntd}`, {
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
function confirmarExclusaoEntrada(){
    return confirm(
        "Você tem certeza que deseja excluir esta entrada? Esta função é " +
        "irreversível."
    );
}

/**
 * Mostra o forms para edição de dados de entradas.
 * @param {object} cli - Dados do entradas a ser alterado.
 */
function mostrarFormEdicaoEntradas(cli) {
    const editEntradasForm = document.getElementById("edit-form-entradas");
    
    if (editEntradasForm.style.display !== "block") {
        editEntradasForm.style.display = "block";

        const CodigoTextbox = document.getElementById("edit-codigo-entradas");
        const DataDaVendaTextbox = document.getElementById("edit-Data-Da-Venda-entradas");
        const QuantidadeTextbox = document.getElementById("edit-Quantidade-entradas");
        const NotaFiscalTextbox = document.getElementById("edit-Nota-fiscal-entradas");
        const ValorTotalTextbox = document.getElementById("edit-Valor-Total-entradas");
    
        CodigoTextbox.value = cli.Codigo;
        DataDaVendaTextbox.value = cli.DataDaVenda;
        QuantidadeTextbox.value = cli.Quantidade;
        NotaFiscalTextbox.value = cli.NotaFiscal;
        ValorTotalTextbox.value = cli.ValorTotal;
    } else {
        editEntradasForm.style.display = "none";
    }
}

/**
 * Mostra forms para cadastro de cliente.
 */

function monstrarFormCriacaoEntradas(){
    const addEntradasForm = document.getElementById("add-form-entradas");

    if (addEntradasForm.style.display !== "block") {
        addEntradasForm.style.display = "block";
    } else {
        addEntradasForm.style.display = "none";
    }
}

/**
 * Retorna clientes com nome contendo uma dada string.
 * @param {string} str - String para busca de nome.
 * @param {Array} cliArr - Array com clientes a serem buscados.
 */

function procurarEntrada(str, cliArr) {
    const entradas = [];
    for (const cli of cliArr) {
        if (cli.nome.includes(str))
            entradas.push(cli);
    }

    return entradas;
}