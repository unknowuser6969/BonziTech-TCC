// sessao.go controla as sessões dos usuários do
// aplicativo da Connect
package services

import (
	"log"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"

	"github.com/vidacalura/BonziTech-TCC/internal/models"
)

// TODO: funcionar apenas com sysKey
func GetSessao(c *gin.Context) {
	codSessao := c.Param("codSessao")

	query := "SELECT * FROM sessao WHERE cod_sessao = ?;"
	rows := DB.QueryRow(query, codSessao)

	var s models.Sessao
	err := rows.Scan(&s.CodSessao, &s.CodUsuario, &s.Entrada, &s.Saida)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Erro ao encontrar sessão de usuário"})
		return
	}

	c.IndentedJSON(http.StatusOK, s)
}

// TODO: funcionar apenas com sysKey
func CriarSessao(c *gin.Context) {
	var s models.Sessao
	if err := c.BindJSON(&s); err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Dados de sessão inválidos."})
		return
	}

	if s.CodUsuario == 0 {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Código de usuário não pode estar vazio."})
		return
	}

	// TODO: validar código de usuários

	// Fecha sessões antigas
	update := "UPDATE sessao SET saida = now() WHERE cod_usu = ? AND saida IS NULL;"
	_, err := DB.Exec(update, s.CodUsuario)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Erro ao fechar sessões antigas. Tente novamente"})
		return
	}

	s.CodSessao = gerarCodigoSessao()

	// Cria nova sessão
	insert := "INSERT INTO sessao (cod_sessao, cod_usu, entrada) VALUES(?, ?, ?);"
	_, err = DB.Exec(insert, s.CodSessao, s.CodUsuario, time.Now().Format("2006-01-02 15:04:05"))
	if err != nil {
		if strings.Contains(err.Error(), "Error 1062 (23000)") {
			for err != nil {
				s.CodSessao = gerarCodigoSessao()
				_, err = DB.Exec(insert, s.CodSessao, s.CodUsuario, time.Now().Format("2006-01-02 15:04:05"))
			}
		} else {
			log.Println(err)
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar sessão. Tente novamente"})
			return
		}
	}

	c.IndentedJSON(http.StatusCreated, gin.H{
		"codSessao": s.CodSessao,
		"message":   "Sessão criada com sucesso!",
	})
}

func FecharSessao(c *gin.Context) {
	codSessao := c.Request.Header["Codsessao"]
	if codSessao == nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Você precisa estar logado para ter acesso ao sistema"})
		c.Abort()
		return
	}

	delete := "UPDATE sessao SET saida = ? WHERE cod_sessao = ?;"
	_, err := DB.Exec(delete, time.Now().Format("2006-01-02 15:04:05"), codSessao[0])
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Erro ao finalizar sessão. Tente novamente mais tarde."})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"message": "Sessão de usuário finalizada com sucesso!"})
}

func gerarCodigoSessao() int {
	codSessao := (rand.Intn(9)+1)*10000000 +
		rand.Intn(10)*1000000 +
		rand.Intn(10)*100000 +
		rand.Intn(10)*10000 +
		rand.Intn(10)*1000 +
		rand.Intn(10)*100 +
		rand.Intn(10)*10 +
		rand.Intn(10)

	return codSessao
}
