
# BonziTech-TCC API

## Sumário

* [Status Codes](#status-codes)
* [Responses](#responses)
* [Código de sessão](#código-de-sessão-codsessao) 
* [/api/auth](#apiauth)
* [/api/estoque](#apiestoque)
* [/api/sessao](#apisessao)
* [/api/usuarios](#apiusuarios)

## Status Codes

Os status de respostas possíveis para esta API são:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

## Responses

Os endpoints terão sempre 2 possíveis responses, 
sendo elas:

```javascript
{
  ...
  "message": String
}
```

```javascript
{
  "error": String
}
```

O atributo `message` estará presente caso uma request seja concluída com sucesso, e ausente caso contrário.

O atributo `error` estará presente caso uma request não seja devidamente concluída, retornando o devido erro.

Além disso, os endpoints podem retornar outros atributos específicos daquele endpoint, mas sempre
serão retornados estes dois atributos.

## Código de sessão (codSessao):

Muitas funções da API necessitam da identificação do usuário para serem efetudas, por isso, sempre, ao
fazer uma request à API, deve ser passado, pelos headers, o código de sessão do usuário, pela chave (key)
`codSessao` ou `Codsessao`.

Para ações como login, ou ping, não é necessário o código de sessão do usuário.

## Endpoints:

#### Verificar conexão com API

```http
GET /api/ping
```

### /api/auth 

#### Validar login

```http
POST /api/auth/login
```

Request body:

```javascript
{
  "email": String
  "senha": String
}
```

Exemplo:

```javascript
{
  "email": "teste",
  "senha": "CvNWmufjpBqmAVNgAFf2U6KEvrPEY8g4hnMUpjLRjT3HBHCZYaSHE6xUPUJdWYMHDejgALzzaurpLsLcQSpan2sPjtMk8YVbahRUkwTUJDJQRmFUe2eMrgQcrjggBgPz"
}
```

Response:

```javascript
{
  "codSessao": Number
}
```

### /api/estoque

#### Mostrar estoque

```http
GET /api/estoque
```

Response:
```javascript
{
  "estoque": []object || null
}
```

#### Adicionar componente ao estoque

```http
POST /api/estoque
```

Request body:
```javascript
{
  "CodComp": Number,
  "min": Number,
  "max": Number,
  "quantidade": Number 
}
```

#### Editar dados de componente em estoque

```http
PUT /api/estoque
```

Request body:
```javascript
{
  "CodComp": Number,
  "min": Number,
  "max": Number,
  "quantidade": Number 
}
```

#### Remover componente de estoque

```http
DELETE /api/estoque/${codComp}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `codComp`      | `string` | **Required**. Código do componente a ser removido do estoque |

### /api/sessao

#### Retornar informações de sessão de usuário

```http
GET /api/sessao/${codSessao}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `codSessao`      | `string` | **Required**. Código da sessão a ser procurada |

Response:

```javascript
{
  "codSessao": Number,
  "codUsuario": Number,
  "entrada": String,
  "saida": object
}
```

#### Criar sessão

```http
POST /api/sessao
```

Request body:

```javascript
{
  "codUsuario": Number
}
```

Exemplo:
```javascript
{
  "codUsuario": 10000000
}
```

Response:
```javascript
{
  "codSessao": Number
}
```

#### Encerrar sessão

```http
DELETE /api/sessao
```

### /api/usuarios

#### Retornar todos os usuários do sistema

```http
GET /api/usuarios
```

Response:

```javascript
{
  "usuarios": []object || null
}
```

#### Retornar um usuário do sistema

```http
GET /api/usuarios/${codUsu}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `codUsu`      | `string` | **Required**. Código do usuário a ser  procurado |

Response:

```javascript
{
  "usuario": object
}
```

#### Criar novo usuário

```http
POST /api/usuarios
```

Request body:

```javascript
{
  "permissoes": String,
  "nome": String,
  "email": String,
  "senha": String
}
```

Exemplo:
```javascript
{
  "permissoes": "Leitura",
  "nome": "Adalberto R.",
  "email": "adalbertorocha@gmail.com",
  "senha": "CvNWmufjpBqmAVNgAFf2U6KEvrPEY8g4hnMUpjLRjT3HBHCZYaSHE6xUPUJdWYMHDejgALzzaurpLsLcQSpan2sPjtMk8YVbahRUkwTUJDJQRmFUe2eMrgQcrjggBgPz"
}
```

#### Atualizar um usuário

```http
PUT /api/usuarios/${codUsu}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `codUsu`      | `string` | **Required**. Código do usuário a ser  atualizado |

Request body:

```javascript
{
  "permissoes": String,
  "nome": String,
  "email": String,
  "senha": String
}
```

Exemplo:
```javascript
{
  "permissoes": "Leitura",
  "nome": "Adalberto R.",
  "email": "adalbertorocha@gmail.com",
  "senha": "CvNWmufjpBqmAVNgAFf2U6KEvrPEY8g4hnMUpjLRjT3HBHCZYaSHE6xUPUJdWYMHDejgALzzaurpLsLcQSpan2sPjtMk8YVbahRUkwTUJDJQRmFUe2eMrgQcrjggBgPz"
}
```

#### Desativar um usuário

```http
DELETE /api/usuarios/${codUsu}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `codUsu`      | `string` | **Required**. Código do usuário a ser inativado |

