require("dotenv").config();
const express = require("express");
const fabRouter = express.Router();

const path = require("path");
const publicFolder = "../public/";

const validarSessao = require("../modules/validarSessao");

fabRouter.get("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/fabricantes`, {
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

        res.json(response.fabricantes);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

fabRouter.post("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/fabricantes`, {
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

fabRouter.put("/", validarSessao, (req, res) => {
    console.log(req.body);
    fetch(process.env.APIURL + `/fabricantes`, {
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

fabRouter.delete("/:codUsu", validarSessao, (req, res) => {
    const codUsu = req.params.codUsu;

    fetch(process.env.APIURL + `/fabricantes/${codUsu}`, {
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

module.exports = fabRouter;