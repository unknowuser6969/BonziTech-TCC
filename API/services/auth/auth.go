// auth.go contém o microserviço de autenticação
// de usuários e suas sessões
package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
    "io/ioutil"
	"log"
	"net/http"

	"connect-ms-auth/utils"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type usuarioResponse struct {
	CodUsuario int 	  `json:"codUsuario"`
	Permissoes string `json:"permissoes"`
	Nome 	   string `json:"nome"`
	Email	   string `json:"email"`
	Senha	   string `json:"senha"`
	Error      string `json:"error"`
	Message    string `json:"message"`
}

type sessaoResponse struct {
	CodSessao  int    		  `json:"codSessao"`
	CodUsuario int    		  `json:"codUsuario"`
	Entrada    string 		  `json:"entrada"`
	Saida      sql.NullString `json:"saida"`
	Error      string         `json:"error"`
	Message    string         `json:"message"`
}

var db *sql.DB

func main() {

	db = utils.ConectarBD()

	r := gin.Default()

	r.POST("/api/auth/login", validarLogin)
	//r.POST("/api/auth/usuario/:codSessao -> não existe em POST", validarPermissoesUsuario)

	r.Run("127.0.0.1:4001")

}

func validarLogin(c *gin.Context) {
	var u usuarioResponse
	err := c.BindJSON(&u)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Dados de usuário inválidos." })
		return
	}

	// Chama microserviço de usuários para validação de email e senha
	valuesUsuario := map[string]string{ "email": u.Email, "senha": u.Senha }
	jsonValue, _ := json.Marshal(valuesUsuario)

	respUsuariosLogin, err := http.Post("http://127.0.0.1:4002/api/usuarios/login", "Application/JSON", bytes.NewBuffer(jsonValue))
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		return
	}

	defer respUsuariosLogin.Body.Close()
    resBody, err := ioutil.ReadAll(respUsuariosLogin.Body)

    if err := json.Unmarshal(resBody, &u); err != nil {
        log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		return
    }

	if u.Error != "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": u.Error })
		return
	}

	// Chama microserviço de sessão para criação de nova sessão
	valuesSessao := map[string]int{ "codUsuario": u.CodUsuario }
	jsonValue, _ = json.Marshal(valuesSessao)

	respSessao, err := http.Post("http://127.0.0.1:4003/api/sessao", "Application/JSON", bytes.NewBuffer(jsonValue))
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		return
	}

	defer respSessao.Body.Close()
    resBody, err = ioutil.ReadAll(respSessao.Body)

	var s sessaoResponse
    if err := json.Unmarshal(resBody, &s); err != nil {
        log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		return
    }

	if s.Error != "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": s.Error })
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{ "message": "Usuário autenticado com sucesso!", "codSessao": s.CodSessao })

}

func validarPermissoesUsuario(c *gin.Context) {

}