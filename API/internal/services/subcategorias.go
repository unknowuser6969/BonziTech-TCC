// subcateforias.go possui todas as funcionalidades relacionadas
// a subcategorias de produtos do aplicativo da Connect
package services

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"

	models "github.com/vidacalura/BonziTech-TCC/internal/models"
)

func MostrarSubcategoriasDeCategoria(c *gin.Context) {
	codCat := c.Param("codCat")

	row := DB.QueryRow("SELECT cod_cat FROM categorias WHERE cod_cat = ?;", codCat)
	err := row.Scan(&codCat)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusNotFound, gin.H{ "error": "Erro ao encontrar categoria." })
		return
	}

	rows, err := DB.Query("SELECT * FROM subcategorias WHERE cat_principal = ?;", codCat)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar ao banco de dados. Tente novamente mais tarde." })
		return
	}

	var subcats []models.Subcategoria
	for rows.Next() {
		var subcat models.Subcategoria
		err := rows.Scan(&subcat.CodSubcat, &subcat.CodCat, &subcat.Nome)
		if err != nil {
			log.Println(err)
			c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o banco de dados." })
			return
		}

		subcats = append(subcats, subcat)
	}

	if err := rows.Err(); err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o banco de dados." })
		return
	}

	defer rows.Close()

	c.IndentedJSON(http.StatusOK, gin.H{ "subcategorias": subcats, "message": "Categorias encontradas com sucesso!" })
}

func MostrarComponentesSubcategoria(c *gin.Context) {

}

func CriarSubcategoria(c *gin.Context) {

}

func AtualizarSubcategoria(c *gin.Context) {

}

func DeletarSubcategoria(c *gin.Context) {

}
