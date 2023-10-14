// models.go contém os modelos das tabelas e campos do
// banco de dados da aplicação
package models

import "gopkg.in/guregu/null.v3"

type Categoria struct {
	CodCat     int    `json:"codCat"`
	NomeCat    string `json:"nomeCat"`
	UnidMedida string `json:"unidMedida"`
	Montagem   bool   `json:"montagem"`
	Apelido    string `json:"apelido"`
}

type Componente struct {
	CodComp          int         `json:"codComp"`
	CodPeca          string      `json:"codPeca"`
	Especificacao    string      `json:"especificacao"`
	CodCat           int         `json:"codCat"`
	CodSubcat        null.Int    `json:"codCat"`
	DiamInterno      null.String `json:"diamInterno"`
	DiamExterno      null.Float  `json:"diamExterno"`
	DiamNominal      null.String `json:"diamNominal"`
	MedidaD          null.Int    `json:"medidaD"`
	Costura          null.Bool   `json:"costura"`
	PrensadoReusavel null.String `json:"prensadoReusavel"`
	Mangueira        null.String `json:"mangueira"`
	Material         null.String `json:"material"`
	Norma            null.String `json:"norma"`
	Bitola           null.Int    `json:"bitola"`
	ValorEntrada     float64     `json:"valorEntrada"`
	ValorSaida       float64     `json:"valorEntrada"`
}

type Cliente struct {
	CodCli      int         `json:"codCli"`
	NomeEmpresa string      `json:"nomeEmpresa"`
	NomeCli     string      `json:"nome"`
	Tipo        null.String `json:"tipo"`
	DiaReg      string      `json:"diaReg"`
	Endereco    null.String `json:"endereco"`
	Bairro      null.String `json:"bairro"`
	Cidade      string      `json:"cidade"`
	Estado      string      `json:"estado"`
	CEP         null.String `json:"cep"`
	Email       null.String `json:"email"`
}

type Estoque struct {
	CodEstq    int     `json:"codEstq"`
	CodComp    int     `json:"codComp"`
	QuantMin   int     `json:"min"`
	QuantMax   int     `json:"max"`
	QuantAtual float64 `json:"quantidade"`
}

type Fabricante struct {
	CodFab      int         `json:"codFab"`
	Nome        string      `json:"nome"`
	NomeContato null.String `json:"nomeContato"`
	RazaoSocial null.String `json:"razaoSocial"`
	Telefone    null.String `json:"telefone"`
	Celular     null.String `json:"celular"`
	Fax         null.String `json:"fax"`
	Endereco    null.String `json:"endereco"`
	Cidade      null.String `json:"cidade"`
	Estado      null.String `json:"estado"`
	CEP         null.String `json:"cep"`
}

type Log struct {
	CodLog    int    `json:"codLog"`
	TipoReq   string `json:"tipoReq"`
	Caminho   string `json:"caminho"`
	StatusRes int    `json:"statusRes"`
	CodSessao int    `json:"codSessao"`
	Data      string `json:"data"`
}

type Sessao struct {
	CodSessao  int    	   `json:"codSessao"`
	CodUsuario int    	   `json:"codUsuario"`
	Entrada    string 	   `json:"entrada"`
	Saida      null.String `json:"saida"`
}

type SessaoResponse struct {
	CodSessao  int    	   `json:"codSessao"`
	CodUsuario int    	   `json:"codUsuario"`
	Entrada    string 	   `json:"entrada"`
	Saida      null.String `json:"saida"`
	Error      string      `json:"error"`
	Message    string      `json:"message"`
}

type Subcategoria struct {
	CodSubcat int    `json:"codSubcat"`
	CodCat    int    `json:"codCat"`
	Nome      string `json:"nome"`
}

type Telefone struct {
	CodTel      int         `json:"codTel"`
	CodCli      int         `json:"codCli"`
	Telefone    string      `json:"telefone"`
	NomeTel     string      `json:"nomeTel"`
	TipoContato null.String `json:"tipoContato`
	TipoCli     null.String `json:"tipoCli"`
}

type Usuario struct {
	CodUsuario int 	  `json:"codUsuario"`
	Permissoes string `json:"permissoes"`
	Nome 	   string `json:"nome"`
	Email	   string `json:"email"`
	Senha	   string `json:"senha"`
	Ativo      bool   `json:"ativo"`
}

type UsuarioResponse struct {
	CodUsuario int 	  `json:"codUsuario"`
	Permissoes string `json:"permissoes"`
	Nome 	   string `json:"nome"`
	Email	   string `json:"email"`
	Senha	   string `json:"senha"`
	Ativo      bool   `json:"ativo"`
	Error      string `json:"error"`
	Message    string `json:"message"`
}