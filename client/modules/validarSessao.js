/*
* Middleware que valida se usuário está logado no sistema e o
* redireciona à tela de login caso não esteja.
*/
module.exports = (req, res, next) => {
    if (req.session.codSessao == null) {
        res.redirect(307, "/login");
        return;
    }

    next();
}