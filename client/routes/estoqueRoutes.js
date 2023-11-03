require("dotenv").config();
const express = require("express");
const estqRouter = express.Router();

const validarSessao = require("../modules/validarSessao");

estqRouter.get("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/estoque`, {
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

estqRouter.post("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/estoque`, {
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

estqRouter.put("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/estoque`, {
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

estqRouter.delete("/:codComp", validarSessao, (req, res) => {
    const codComp = req.params.codComp;

    fetch(process.env.APIURL + `/estoque/${codComp}`, {
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

module.exports = estqRouter;