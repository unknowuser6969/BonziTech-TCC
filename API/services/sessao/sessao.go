// sessao.go controla as sessões dos usuários do
// aplicativo da Connect
package main

import (
	"database/sql"
	"log"
	"math/rand"
	"net/http"
	"time"

	"connect-ms-sessao/utils"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type sessao struct {
	CodSessao  int    		  `json:"codSessao"`
	CodUsuario int    		  `json:"codUsuario"`
	Entrada    string 		  `json:"entrada"`
	Saida      sql.NullString `json:"saida"`
}

var db *sql.DB

func main() {

	db = utils.ConectarBD()

	r := gin.Default()

	r.GET("/api/sessao/:codSessao", getSessao)
	r.POST("/api/sessao", criarSessao)

	r.Run("127.0.0.1:4003")

}

func getSessao(c *gin.Context) {
	codSessao := c.Param("codSessao")

	query := "SELECT * FROM sessao WHERE cod_sessao = ?;"
	rows := db.QueryRow(query, codSessao)

	var s sessao
	err := rows.Scan(&s.CodSessao, &s.CodUsuario, &s.Entrada, &s.Saida)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Erro ao encontrar sessão" })
		return
	}

	c.IndentedJSON(http.StatusOK, s)

}

func criarSessao(c *gin.Context) {
	var s sessao
	if err := c.BindJSON(&s); err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Dados de sessão inválidos." })
		return
	}

	if s.CodUsuario == 0 {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Código de usuário não pode estar vazio." })
		return
	}

	s.CodSessao = gerarCodigoSessao()

	insert := "INSERT INTO sessao (cod_sessao, cod_usu, entrada) VALUES(?, ?, ?);"
	_, err := db.Exec(insert, s.CodSessao, s.CodUsuario, time.Now().Format("2006-01-02 15:04:05"))
	if err != nil {
		log.Println(err)
		// Existe a chance muito pequena de uma sessão nova ser criada com o
		// mesmo código de uma sessão antiga, e neste caso, o usuário deve
		// tentar fazer login novamente, após receber esta mensagem de erro
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao criar sessão. Tente novamente" })
		return
	}

	// REMOVER SESSÕES ANTIGAS

	c.IndentedJSON(http.StatusOK, gin.H{ "codSessao": s.CodSessao, "message": "Sessão criada com sucesso!" })
}

func gerarCodigoSessao() int {
	codSessao := (rand.Intn(9) + 1) * 10000000 +
			rand.Intn(10) * 1000000 +
			rand.Intn(10) * 100000 +
			rand.Intn(10) * 10000 +
			rand.Intn(10) * 1000 +
			rand.Intn(10) * 100 +
			rand.Intn(10) * 10 +
			rand.Intn(10)
	
	return codSessao
}