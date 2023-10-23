require("dotenv").config();
const express = require("express");
const router = express.Router();

const path = require("path");
const publicFolder = "../public/";

const validarSessao = require("../modules/validarSessao");

router.get("/", (req, res) => {
    res.redirect(307, "/dashboard");
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, publicFolder, "login.html"));
})

router.get("/dashboard", validarSessao, (req, res) => {
    res.sendFile(path.join(__dirname, publicFolder, "dashboard.html"));
});

router.get("/perfil", validarSessao, (req, res) => {
    res.sendFile(path.join(__dirname, publicFolder, "profile.html"));
});

router.post("/login", (req, res) => {
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

module.exports = router;