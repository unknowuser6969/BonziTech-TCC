require("dotenv").config();
const express = require("express");
const saidasRouter = express.Router();

const validarSessao = require("../modules/validarSessao");

module.exports = saidasRouter;