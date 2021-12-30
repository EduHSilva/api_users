# API USERS
API REST genérica de usuários feita em Nodejs.

### Tecnologias utilizadas
- NodeJS
- KnexJS

# Docs
Rotas com * necessitam de auth
### Cadastro (POST /user)
    {
        "name": "Eduardo Henrique",
        "email": "edu.slhenrique0@gmail.com",
        "password": "123456"
    }
#### Retorno
    {
        "success": "Usuario criado com sucesso"
    }

### Login (POST /login)
    {
        "email": "edu.slhenrique0@gmail.com",
        "password": "123456"
    }
#### Retorno
    {
	    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkdS5zbGhlbnJpcXVlMEBnbWFpbC5jb20iLCJyb2xlIjoxLCJpYXQiOjE2NDA4NzI0OTd9.bAVfUDUGgc2Mt4o9am_XU3P_dYfMmnEPNhslE2mlm-Y"
    }

### Busca por todos usuários (GET /user) *
#### Retorno
    [
        {
            "id": 5,
            "email": "edu.slhenrique6@gmail.com",
            "role": 0,
            "name": "Eduardo Henrique",
            "created_at": "2021-12-27T20:54:04.507Z",
            "updated_at": "2021-12-27T20:54:04.507Z"
        },
        {
            "id": 1,
            "email": "edu.slhenrique@gmail.com",
            "role": 1,
            "name": "Edu",
            "created_at": "2021-12-27T18:53:31.640Z",
            "updated_at": "2021-12-27T18:53:31.640Z"
        }
    ]
### Busca por usuário (GET /user/:id) *
#### Retorno
    {
        "id": 1,
        "email": "edu.slhenrique@gmail.com",
        "role": 1,
        "name": "Edu",
        "created_at": "2021-12-27T18:53:31.640Z",
        "updated_at": "2021-12-27T18:53:31.640Z"
    }

### Atualiza usuário (PUT /user/:id) *
    {
        "id": 1,
        "name": "Edu",
        "role": 1,
        "email": "edu.slhenrique0@gmail.com"
    }
#### Retorno
    {
        "success": "Usuario atualizado com sucesso"
    }

### Deleta usuário (DELETE /user/:id) *
#### Retorno
    {
        "success": "Usuario deletado com sucesso"
    }

### Recuperar senha (POST /recoverpassword) 
    {
        "email": "edu.slhenrique@gmail.com"
    }
#### Retorno
    {
        "status": true,
        "token": 1640642793859
    }

### Mudar senha (POST /changepassword)
    {
        "token": "1640642793859",
        "password": "1233212"
    }
#### Retorno
    {
        "success": "Senha alterada com sucesso"
    }
