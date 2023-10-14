// logs.go possui todas as funcionalidades relacionadas
// à criação de logs de usuários 
package services

import (
	"log"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"

	models "github.com/vidacalura/BonziTech-TCC/internal/models"
)

func CriarLogDBMiddleware(c *gin.Context) {
	c.Next()

	var l models.Log

	codSessaoStr := "0"
	if len(c.Request.Header["Codsessao"]) > 0 {
		codSessaoStr = c.Request.Header["Codsessao"][0]
	}

	codSessao, err := strconv.Atoi(codSessaoStr)
	if err != nil {
		log.Println(err)
		return
	}

	l.CodSessao = codSessao
	l.TipoReq = c.Request.Method
	l.Caminho = c.Request.URL.Path
	l.StatusRes = c.Writer.Status()

	insert := "INSERT INTO logs (tipo_req, caminho, status_res, cod_sessao, data) VALUES(?, ?, ?, ?, ?);"
	_, err = DB.Exec(insert, l.TipoReq, l.Caminho, l.StatusRes, l.CodSessao,
		time.Now().Format("2006-01-02 15:04:05"))
	if err != nil {
		log.Println(err)
		return
	}
}