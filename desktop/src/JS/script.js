const btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener("click", login);

const urlAPI = "http://45.33.122.214:4000/api";
async function login(e) {
    const senhaTextbox = document.getElementById("password-textbox");
    const emailTextbox = document.getElementById("email-textbox");
    e.preventDefault();
    await fetch(urlAPI + "/auth/login", {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            email: emailTextbox.value.trim(),
            senha: senhaTextbox.value.trim()
        })
    })
    .then((res) => { return res.json(); })
    .then((res) => {
        console.log(res);
        const error = res.error;
        if (error) {
            alert(error);
            return;
        }
        window.location.href = "../home.html";
    }).catch (error => console.log(error));

}


