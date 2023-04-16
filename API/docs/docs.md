
# BonziTech-TCC API

## Sumário

* [Status Codes](#status-codes)
* [Responses](#responses)
* [/api/usuarios](#apiusuarios)
* [/api/auth](#apiauth)

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

## Endpoints:

#### Verificar conexão com API

```http
GET /api/ping
```

### /api/usuarios

#### Retornar todos os usuários do sistema

```http
GET /api/usuarios
```

Response:

```javascript
{
  "usuarios": []object
}
```

#### Retornar um usuário do sistema

```http
GET /api/usuarios/${cod_usu}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cod_usu`      | `string` | **Required**. Código do usuário a ser  procurado |

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
PUT /api/usuarios/${cod_usu}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cod_usu`      | `string` | **Required**. Código do usuário a ser  atualizado |

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

#### Excluir um usuário

```http
DELETE /api/usuarios/${cod_usu}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cod_usu`      | `string` | **Required**. Código do usuário a ser excluído |

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
