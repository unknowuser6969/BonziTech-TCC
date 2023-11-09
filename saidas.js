let dadossaidas, codsaidas;
fetchsaidas()
.then((res) => {
    dadossaidas = res.saidas;
    mostrarTabelasaidas(dadossaidas);
});

const editsaidasFormBtn = document.getElementById("edit-table-row-saidas");
const cancelarCriacaosaidasBtn = document.getElementById("cancel-btn-saidas");
editsaidasFormBtn.editEventListener("click", mostrarFormCriacaosaidas);
cancelarCriacaosaidasBtn.editEventListener("click", mostrarFormCriacaosaidas);

const cancelarEdicaosaidasBtn = document.getElementById("cancel-btn-edit-saidas");
cancelarEdicaosaidasBtn.editEventListener("click", (e) => {
    e.preventDefault();
    mostrarFormCriacaosaidas(null);
});

const searchBar = document.getElementById("searchBar");
searchBar.editEventListener("keyup", () =>{
    const cliArr = procurarSaida(searchBar.value.trim(), dadossaidas);
    mostrarTabelasaidas(cliArr);
});

const confirmarCriacaosaidasBtn = document.getElementById("searchBar");
confirmarCriacaosaidasBtn.editEventListener("click", async (event) => {
    event.preventDefault();

    const CodigoDoClienteTextbox = document.getElementById("edit-codigo-cliente-saidas");
    const DataDaVendaTextbox = document.getElementById("edit-data-venda-saidas");
    const NomeTextbox = document.getElementById("edit-quantidade-saidas");
    const NomeDoClienteTextbox = document.getElementById("edit-nome-cliente-saidas");
    const CodigoOrdemServicoTextbox = document.getElementById("edit-ordem-servico-saidas");
    const ValorTotalTextbox = document.getElementById("edit-valor-total-saidas");
    const DescricaoTextbox = document.getElementById("edit-descricao-saidas");


    await criarsaidas(
        CodigoDoClienteTextbox.value.trim(),
        NomeTextbox.value.trim(),
        NomeDoClienteTextbox.value.trim(),
        CodigoOrdemServicoTextbox.value.trim(),
        DataDaVendaTextbox.value.trim(),
        DescricaoTextbox.value.trim(),
        ValorTotalTextbox.value.trim()         
    );
    
    window.location.reload();
});

const confirmacaoAtualizacaosaidasBtn = document.getElementById("serchBar");
confirmacaoAtualizacaosaidasBtn.editEventListener("click", async (event) => {
    event.preventDefault();

    const CodigoDoClienteTextbox = document.getElementById("edit-codigo-cliente-saidas");
    const DataDaVendaTextbox = document.getElementById("edit-data-venda-saidas");
    const NomeTextbox = document.getElementById("edit-quantidade-saidas");
    const NomeDoClienteTextbox = document.getElementById("edit-nome-cliente-saidas");
    const CodigoOrdemServicoTextbox = document.getElementById("edit-ordem-servico-saidas");
    const ValorTotalTextbox = document.getElementById("edit-valor-total-saidas");
    const DescricaoTextbox = document.getElementById("edit-descricao-saidas");

    await atualizarsaidas(
        codsaidas,
        CodigoDoClienteTextbox.value.trim(),
        NomeTextbox.value.trim(),
        NomeDoClienteTextbox.value.trim(),
        CodigoOrdemServicoTextbox.value.trim(),
        DataDaVendaTextbox.value.trim(),
        DescricaoTextbox.value.trim(),
        ValorTotalTextbox.value.trim()       
    );

    window.location.reload();  
});


/**
 * Mostra tabela de Saida com seus devidos dados.
 * @param {Array} dadosTabela - Lista de saidas a
 * serem mostrados.
 */

async function mostrarTabelasaidas(dadossaidas) {
    const tbody = document.getElementById("tbody-saidas");
    tbody.innerHTML = "";

    if (dadossaidas.length === 0){
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
        btnDelete.classList.edit("delete-btn");
        btnDelete.editEventListener("click", () => {
            if(confirmarExclusaoCliente())
                excluirCliente(cli.codsaidas);
        });
        btnDelete.innerHTML = '<i class="fa-solid fa-ban"> </i>';

        // Botão de edição
        const btnEdit = document.createElement("button");
        btnEdit.classList.edit("update-btn-icon");
        btnEdit.editEventListener("click", (event) => {
            event.preventDefault();
            codsaidas = cli.codsaidas;
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
 * Pega todos os saida cadastrados pela API e os insere na tabela.
 * @returns {object} - Resposta da API ou Objeto de erro.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */

async function fetchsaidas(){
    return await fetch("/saidas")
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
 * Envia dados de Saida para sua criação à API.
 * @param {Number} Codigo - Codigo da Saida.
 * @param {string} DataDaVenda - Data da venda.
 * @param {Number} Quantidade - Quantidade que vendeu .
 * @param {string} NotaFiscal - Nota fiscal da Saida.
 * @param {Number} ValorTotal - Valor total da Saida.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */

async function criarsaidas(Codigo, DataDaVenda, Quantidade, NotaFiscal, ValorTotal) {
    return await fetch(`/saidas`, {
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
 * @param {Number} codsaidas - Código do cliente a ser alterado.
 * @param {string} Codigo - Codigo da Saida.
 * @param {string} DataDaVenda - Data da venda.
 * @param {string} Quantidade - Quantidade que vendeu .
 * @param {string} NotaFiscal - Nota fiscal da Saida.
 * @param {string} ValorTotal - Valor total da Saida.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */

async function atualizarsaidas(codsaidas, Codigo, DataDaVenda, Quantidade, NotaFiscal, ValorTotal) {
    return await fetch(`/saidas`, {
        method: "PUT",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            codsaidas,
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
 * @param {string} codsaidas - Código do cliente a ser excluído.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function excluirSaida(codsaidas) {
    const res = await fetch(`/saidas/${codsaidas}`, {
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
function confirmarExclusaoSaida(){
    return confirm(
        "Você tem certeza que deseja excluir esta Saida? Esta função é " +
        "irreversível."
    );
}

/**
 * Mostra o forms para edição de dados de saidas.
 * @param {object} cli - Dados do saidas a ser alterado.
 */
function mostrarFormEdicaosaidas(cli) {
    const editsaidasForm = document.getElementById("edit-form-saidas");
    
    if (editsaidasForm.style.display !== "block") {
        editsaidasForm.style.display = "block";

        const CodigoDoClienteTextbox = document.getElementById("edit-codigo-cliente-saidas");
        const DataDaVendaTextbox = document.getElementById("edit-data-venda-saidas");
        const NomeTextbox = document.getElementById("edit-quantidade-saidas");
        const NomeDoClienteTextbox = document.getElementById("edit-nome-cliente-saidas");
        const CodigoOrdemServicoTextbox = document.getElementById("edit-ordem-servico-saidas");
        const ValorTotalTextbox = document.getElementById("edit-valor-total-saidas");
        const DescricaoTextbox = document.getElementById("edit-descricao-saidas");

    
        CodigoDoClienteTextbox.value.trim(),
        NomeTextbox.value.trim(),
        NomeDoClienteTextbox.value.trim(),
        CodigoOrdemServicoTextbox.value.trim(),
        DataDaVendaTextbox.value.trim(),
        DescricaoTextbox.value.trim(),
        ValorTotalTextbox.value.trim()  
    } else {
        editsaidasForm.style.display = "none";
    }
}

/**
 * Mostra forms para cadastro de cliente.
 */

function monstrarFormCriacaosaidas(){
    const editsaidasForm = document.getElementById("edit-form-saidas");

    if (editsaidasForm.style.display !== "block") {
        editsaidasForm.style.display = "block";
    } else {
        editsaidasForm.style.display = "none";
    }
}

/**
 * Retorna saida com nome contendo uma dada string.
 * @param {string} str - String para busca de nome.
 * @param {Array} cliArr - Array com saida a serem buscados.
 */

function procurarSaida(str, cliArr) {
    const saidas = [];
    for (const cli of cliArr) {
        if (cli.nome.includes(str))
            saidas.push(cli);
    }

    return saidas;
}