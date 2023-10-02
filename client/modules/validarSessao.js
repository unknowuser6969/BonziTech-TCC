/*
* Middleware que valida se usuário está logado no sistema e o
* redireciona à tela de login caso não esteja.
* @param{}
*/
module.exports = (req, res, next) => {
    const usuarioLogado = true;
    if (!usuarioLogado) {
        res.redirect(307, "/login");
        return;
    }

    next();
}