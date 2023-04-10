<script>
    const urlAPI = "http://127.0.0.1:4000/api";

    async function login() {
        const senhaTextbox = document.getElementById("password-textbox");
        const emailTextbox = document.getElementById("email-textbox");

        if (emailTextbox && senhaTextbox) {
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

                window.location.href = "/home";
            });
        }
    }
</script>

<div class="container">
    <form>
        <div class="form-text">
            <h1>Bem vindo de volta!</h1>
            <p>Insira novamente suas informações.</p>
        </div>

    <div class="input-information">
        <label for="email">Email</label>
        <input type="text" id="email-textbox">
    </div>

    <div class="input-information">
        <label for="password">Senha</label>
        <input type="password" id="password-textbox">
    </div>
        
        <button on:click={login}>
            Entrar
        </button>
    </form>
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');


    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container{
        font-family: inter;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        margin-top: 10%;
    }

    form{
        padding: 4em;
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
    }

    .form-text{
        text-align: center;
        margin-bottom: 10%;
    }

    .form-text h1{
        font-weight: bold;
    }

    .input-information{
        font-weight: bold;
        padding: 1em 0em;
        display: flex;
        flex-direction: column;
        gap: 0.4em;
    }

    .input-information input{
        border-radius: 0.2em;
        padding: 0.4em 1em;
        background-color: #F1F1F1;
        outline: none;
        border: none;
    }

    button{
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
        border-radius: 0.4em;
        font-weight: bold;
        font-size: 1em;
        color: #FFF;
        border: none;
        background-color: #E03150;
        margin-top: 10%;
        padding: 0.8em 0em;
    }

    a{
        color: #FFF;
        text-decoration: none;
        width: 100%;
        height: 100%;
    }

    @media (max-width: 600px){
        form{
            box-shadow: none;
            padding: 2em;
        }
    }

</style>