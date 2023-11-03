require("dotenv").config();
const express = require("express");
const entdRouter = express.Router();

const validarSessao = require("../modules/validarSessao");

entdRouter.get("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/entradas`, {
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

entdRouter.get("/:codEntd", validarSessao, (req, res) => {
    const codEntd = req.params.codEntd;

    fetch(process.env.APIURL + `/entradas/${codEntd}`, {
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

entdRouter.post("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/entradas`, {
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

entdRouter.put("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/entradas`, {
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

entdRouter.delete("/:codEntd", validarSessao, (req, res) => {
    const codEntd = req.params.codEntd;

    fetch(process.env.APIURL + `/entradas/${codEntd}`, {
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


entdRouter.post("/componentes", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/entradas/componentes`, {
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

entdRouter.put("/componentes", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/entradas/componentes`, {
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

entdRouter.delete("/componentes/:codComp", validarSessao, (req, res) => {
    const codComp = req.params.codComp;

    fetch(process.env.APIURL + `/entradas/componentes/${codComp}`, {
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

module.exports = entdRouter;