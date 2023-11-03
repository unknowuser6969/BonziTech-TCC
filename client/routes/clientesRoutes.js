require("dotenv").config();
const express = require("express");
const cliRouter = express.Router();

const validarSessao = require("../modules/validarSessao");

cliRouter.get("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/clientes`, {
        method: "GET",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        }
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

cliRouter.get("/:codCli", validarSessao, (req, res) => {
    const codCli = req.params.codCli;

    fetch(process.env.APIURL + `/clientes/${codCli}`, {
        method: "GET",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        }
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

cliRouter.post("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/clientes`, {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        },
        body: JSON.stringify(req.body)
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

cliRouter.put("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/clientes`, {
        method: "PUT",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        },
        body: JSON.stringify(req.body)
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

cliRouter.delete("/:codCli", validarSessao, (req, res) => {
    const codCli = req.params.codCli;

    fetch(process.env.APIURL + `/clientes/${codCli}`, {
        method: "DELETE",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        }
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});


cliRouter.post("/telefones", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/clientes/telefones`, {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        },
        body: JSON.stringify(req.body)
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

cliRouter.put("/telefones", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/clientes/telefones`, {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        },
        body: JSON.stringify(req.body)
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

cliRouter.delete("/telefones/:codTel", validarSessao, (req, res) => {
    const codTel = req.params.codTel;

    fetch(process.env.APIURL + `/clientes/telefones/${codTel}`, {
        method: "DELETE",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        }
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

module.exports = cliRouter;