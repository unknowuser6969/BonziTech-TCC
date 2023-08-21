// main.go é o ponto de entrada da aplicação
package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"

	routes "github.com/vidacalura/BonziTech-TCC/internal/routes"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	router := routes.CriarRouter()

	if err := router.Run(os.Getenv("dominio")); err != nil {
		log.Fatal(err.Error())
	}
}