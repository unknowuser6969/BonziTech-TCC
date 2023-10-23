require("dotenv").config();
const express = require("express");
const funcRouter = express.Router();

const path = require("path");
const publicFolder = "../public/";

const validarSessao = require("../modules/validarSessao");

funcRouter.get("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/usuarios`, {
        method: "GET",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        }
    })
    .then((response) => response.json())
    .then((response) => {
        if (response.error)
            res.json(response)

        res.json(response.usuarios);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

funcRouter.post("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/usuarios`, {
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

funcRouter.put("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/usuarios`, {
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

funcRouter.delete("/:codFab", validarSessao, (req, res) => {
    const codFab = req.params.codFab;

    fetch(process.env.APIURL + `/usuarios/${codFab}`, {
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

module.exports = funcRouter;