const btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener("click", (event) => {
    event.preventDefault();
    btnLogin.innerHTML = "<span class='loader'></span>";

    const senhaTextbox = document.getElementById("password-textbox");
    const emailTextbox = document.getElementById("email-textbox");

    login(emailTextbox.value.trim(), senhaTextbox.value.trim());
});

/**
 * Envia os dados de login ao backend para validação
 * e criação de sessão de usuário
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 */
async function login(email, senha) {
    await fetch("/sessao/login", {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            email,
            senha
        })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.error) {
            mostrarMensagemErro(res.error);
            return;
        }

        window.location.pathname = "/dashboard";
    })
    .catch((error) => {
        console.error(error);
        mostrarMensagemErro("Erro ao conectar ao servidor. Tente novamente mais tarde.");
    });
}

/**
 * Mostra uma mensagem de erro do login ao usuário.
 * @param {string} erro - Erro a ser mostrado ao usuário.
 */
function mostrarMensagemErro(erro) {
    document.getElementById("mensagem-erro").textContent = erro;
}
