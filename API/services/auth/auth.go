// auth.go contém o microserviço de autenticação
// de usuários e suas sessões
package main

import (
	"database/sql"
	"log"
	"net/http"

	"connect-ms-auth/utils"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func main() {

	db = utils.ConectarBD()

	r := gin.Default()

	r.POST("/api/auth/login", validarLogin)
	r.POST("/api/auth/usuario/:codSessao", validarPermissoesUsuario)

	r.Run("127.0.0.1:4001")

}

func validarLogin(c *gin.Context) {

	// Chamar POST :4002/api/usuarios/login

	// Chamar POST :4003/api/sessao

	c.IndentedJSON(http.StatusOK, gin.H{ "message": , "codSessao":  })

}

func validarPermissoesUsuario(c *gin.Context) {

}