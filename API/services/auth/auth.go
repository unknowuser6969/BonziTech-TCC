// auth.go contém o microserviço de usuários
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

	

	r.Run("127.0.0.1:4001")

}