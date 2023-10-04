mostrarTabelaDashboard();

const profileBtn = document.getElementById("profile");
const profileMenu = document.getElementById("profile-menu");
profileBtn.addEventListener("click", mostrarMenuPerfilUsuario);
document.addEventListener("click", (event) => {
    // Fecha o menu de perfil quando a página é clicada
    if (!profileMenu.contains(event.target) && event.target !== profileBtn)
        profileMenu.style.display = "none";
});

/**
 * Verifica a partir dos parâmetros da URL qual tabela
 * da dashboard deve ser mostrada e a expõe ao usuário
 */
function mostrarTabelaDashboard() {
    const urlParams = new URLSearchParams(window.location.search);
    const tabelaSelecionada = urlParams.get("tabela");

    let section;
    const script = document.createElement("script");
    if (tabelaSelecionada) {
        section = document.getElementById(tabelaSelecionada);
        script.src = `/JS/dashboard/${tabelaSelecionada}.js`;
    } else {
        section = document.getElementById("visao-geral");
        script.src = "/JS/dashboard/visaoGeral.js";
    }

    section.style.display = "block";
    document.querySelector("head").appendChild(script);
}

/**
 * Mostra o menu (dropdown) ao clicar na imagem do
 * perfil do usuário na navbar
 */
function mostrarMenuPerfilUsuario() {
    if (profileMenu.style.display === "block") {
        profileMenu.style.display = "none";
    } else {
        profileMenu.style.display = "block";
    }
}

/**
 * Mostra uma mensagem de erro ao usuário
 * @param {string} erro 
 */
function mostrarMensagemErro(erro) {
    alert(erro);
}