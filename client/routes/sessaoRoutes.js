require("dotenv").config();
const express = require("express");
const sessaoRouter = express.Router();

const validarSessao = require("../modules/validarSessao");

sessaoRouter.get("/", validarSessao, (req, res) => {
    const codSessao = req.session.codSessao;

    fetch(process.env.APIURL + `/sessao/${codSessao}`, {
        method: "GET",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": codSessao
        }
    })
    .then((response) => response.json())
    .then((response) => {
        if (response.error) {
            res.status(500).json(response);
            return;
        }

        res.json(response);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

sessaoRouter.post("/login", (req, res) => {
    const { email, senha } = req.body;

    // Fetch API
    fetch(process.env.APIURL + "/auth/login", {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            email,
            senha
        })
    })
    .then((response) => response.json())
    .then((response) => {
        if (response.error) {
            res.status(500).json(response);
            return;
        }

        // Criar sessão de usuário
        req.session.codSessao = response.codSessao;
        res.status(200).json({ message: response.message });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

sessaoRouter.delete("/", validarSessao, (req, res) => {
    const codSessao = req.session.codSessao;

    fetch(process.env.APIURL + `/sessao`, {
        method: "DELETE",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": codSessao
        }
    })
    .then((response) => response.json())
    .then((response) => {
        if (response.error) {
            res.status(500).json(response);
            return;
        }

        req.session.codSessao = null;
        res.json(response);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

module.exports = sessaoRouter;