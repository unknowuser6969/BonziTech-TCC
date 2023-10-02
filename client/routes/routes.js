require("dotenv").config();
const express = require("express");
const router = express.Router();

const path = require("path");
const publicFolder = "../public/";

router.get("/", (req, res) => {
    res.redirect(307, "/dashboard");
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, publicFolder, "login.html"));
})

router.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, publicFolder, "dashboard.html"));
});

router.get("/perfil", (req, res) => {
    res.sendFile(path.join(__dirname, publicFolder, "profile.html"));
});

router.post("/auth/login", (req, res) => {

});

module.exports = router;