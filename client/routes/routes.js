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



module.exports = router;