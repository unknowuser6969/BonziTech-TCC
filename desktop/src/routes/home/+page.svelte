<div id="container">
    <div id="content">
        <div id="content-text">
            <h1>Bem vindo!</h1>
            <p>Escolha uma das opções abaixo:</p>
        </div>

        <div id="content-options">
            <div id="option">
                <img src="/src/img/user.svg" alt="">
                <h3>Seção de administrador</h3>
            </div>

            <div id="option">
                <img src="/src/img/graphic.svg" alt="">
                <h3>Seção de orçamento</h3>
            </div>
        </div>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

    *{
        font-family: inter;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    #container{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }

    #content{
        padding: 1em;
        margin-top: 5%;
    }

    #content-text{
        text-align: center;
    }

    #content h1{
        font-size: 4em;
    }

    #content p{
        font-size: 2em;
        font-weight: bold;
        color: #767676;
    }

    #content-options{
        font-size: 1.2em;
        margin-top: 20%;
        display: flex;
        gap: 12em;
        align-items: center;
        justify-content: space-between;
    }

    #content-options img{
        border-radius: 1.8em;
        padding: 1em;
        background-color: #F7CDD4;
        width: 5em;
        height: 5em;
    }

    #option{
        width: 75%;
        border-radius: 2em;
        padding: 2em;
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        gap: 2em;
        text-align: center;
        justify-content: center;
        align-items: center;
        transition: all ease-in-out 0.3s;
    }

    #option:hover{
        box-shadow: 0px 10px 40px 5px #F7CDD4;
    }

    #option h3{
        width: 75%;
        text-align: center;
    }

    @media (max-width: 900px){
        #content-options{
            gap: 4em;
        }
    }

    @media (max-width: 750px){
        #content-options{
            flex-direction: column;
        }
    }

    @media (max-width: 400px){
        #content-text h1{
            font-size: 3em;
        }

        #content-text p{
            font-size: 1.4em;
        }

        #option{
            width: 100%;
        }
    }
</style>