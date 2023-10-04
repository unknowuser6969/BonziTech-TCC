require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
//app.use(require("./modules/validarSessao"));
app.use(express.static("./public/"));
app.use("/", require("./routes/routes"));
app.use("/clientes", require("./routes/clientesRoutes"));
app.use("/componentes", require("./routes/componentesRoutes"));
app.use("/entradas", require("./routes/entradasRoutes"));
app.use("/estoque", require("./routes/estoqueRoutes"));
app.use("/fabricantes", require("./routes/fabricantesRoutes"));
app.use("/funcionarios", require("./routes/funcionariosRoutes"));
app.use("/saidas", require("./routes/saidasRoutes"));

const port = process.env.PORT || 5000;
app.listen(port);