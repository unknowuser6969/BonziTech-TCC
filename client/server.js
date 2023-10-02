require("dotenv").config();
const express = require("express");
const app = express();

// Middleware
app.use(express.json());
//app.use(require("./modules/validarSessao"));
app.use(express.static("./public/"));
app.use("/", require("./routes/routes"));

const port = process.env.PORT || 5000;
app.listen(port);