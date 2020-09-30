# GoBarber's API

**Descrição:** API desenvolvida durante o Bootcamp GoStack da Rocketseat. Apresentando diversos conceitos de API REST, arquitetura DDD, TDD, SOLID, dependency injection, class-transformation e outros.

## Rotas

  - **GET /providers/**
    - lista todos os provedores de serviço;
```
    curl --request GET \
    --url http://localhost:3333/providers \
    --header 'authorization: Bearer session-token'
```

    - Exemplo de resposta
```
[
  {
    "id": "8691e2a6-5185-4285-b547-6d3976a246c8",
    "name": "Lucas Teste",
    "email": "teste@gmail.com",
    "avatar": null,
    "created_at": "2020-05-02T00:17:54.662Z",
    "updated_at": "2020-05-02T00:17:54.662Z",
    "avatar_url": null
  },
  ...
]
```

  - **GET /providers/:provider_id/month-availability**
    - listagem da disponibilidade mensal do provedor (dias disponíveis);
  ```
    curl --request GET \
    --url http://localhost:3333/providers/:provider_id/month-availability?month=5&year=2020 \
    --header 'authorization: Bearer session-token'
  ```

  - Exemplo de resposta
```
[
  {
    "day": 1,
    "available": false
  },
  {
    "day": 2,
    "available": false
  },
  {
    "day": 3,
    "available": true
  },
  ...
]
```

  - **GET /providers/:provider_id/day-availability**
    - listagem da disponibilidade diária do provedor (horários disponíveis);
  ```
    curl --request GET \
    --url http://localhost:3333/providers/:provider_id/day-availability?day=20&month=5&year=2020 \
    --header 'authorization: Bearer session-token'
  ```

  - Exemplo de resposta
```
[
  {
    "hour": 8,
    "available": true
  },
  {
    "hour": 9,
    "available": false
  },
  {
    "hour": 10,
    "available": true
  },
  ...
]
```

  - **POST /appointments/**
    - criar um novo agendamento
    - Exemplo de corpo da requisição (JSON)
```
    {
      "provider_id": "6849f7asd-98c8-4890-8e18-137f09739d0e",
      "date": "2020-05-27 14:00:00"
    }
```
    - Exemplo de resposta
```
    {
      "provider_id": "6849f7asd-98c8-4890-8e18-137f09739d0e",
      "user_id": "af90b13a-2702-427a-bb30-a4beb9900535",
      "date": "2020-05-27T17:00:00.000Z",
      "id": "74ba831f-7728-4b85-8b04-f9eec43fabf4",
      "created_at": "2020-05-26T00:43:13.071Z",
      "updated_at": "2020-05-26T00:43:13.071Z"
    }
```
  - **GET /appointments/me**
    - lista agendamentos de um provedor específico;
  ```
    curl --request GET \
    --url http://localhost:3333/appointments/me?day=20&month=5&year=2020 \
    --header 'authorization: Bearer session-token'
  ```
   - Exemplo de resposta
```
[
  {
    "id": "0f02f3e8-02da-4f84-a457-d0bfba4f91d6",
    "provider_id": "af90b13a-2702-427a-bb30-a4beb9900535",
    "user_id": "6849f750-c8-4890-8e18-137f09739d0e",
    "date": "2020-05-20T15:00:00.000Z",
    "created_at": "2020-05-13T21:30:39.127Z",
    "updated_at": "2020-05-13T21:30:39.127Z",
    "user": {
      "id": "6849f750-98-4890-8e18-137f09739d0e",
      "name": "Lucas Farias",
      "email": "lucastest@gmail.com",
      "avatar": "078c328a2750a6b7fe-foto_perfil.jpg",
      "created_at": "2020-04-18T03:30:39.205Z",
      "updated_at": "2020-05-10T02:37:49.771Z",
      "avatar_url": "http://localhost:3333/files/078c32f68a2750a6b7fe-foto_perfil.jpg"
    }
  },
  ...
]
```

  - **POST /password/forgot**
    - rota para pedido de recuperação de senha
    - Exemplo de corpo da requisição
```
{
	"email": "lucastest@gmail.com"
}
```
    - Exemplo de resposta
```
    // STATUS 204
    envio de email com link para recuperação de senha
```
  - **POST /password/reset**
    - atualização de senha
    - Exemplo de corpo da requisição
```
{
	"password": "123123",
	"password_confirmation": "123123",
	"token": "9cb45712-22c6-4e5c-a79d-7eae28c4asasd5e2f"
}
```
    - Exemplo de resposta
```
    // STATUS 204
    senha atualizada com sucesso
```
  - **GET /profile/**
    - lista informações de um usuário específico
  ```
    curl --request GET \
    --url http://localhost:3333/profile/ \
    --header 'authorization: Bearer session-token'
  ```
   - Exemplo de resposta
```
{
  "id": "980be250-2ac6-43-9964-fba3a357de48",
  "name": "Lucas Farias",
  "email": "lucastest@gmail.com",
  "avatar": null,
  "created_at": "2020-06-27T22:56:06.685Z",
  "updated_at": "2020-06-27T22:56:06.685Z",
  "avatar_url": null
}
```

  - **PUT /profile/**
    - atualiza informações do usuário
    - Exemplo de corpo da requisição (JSON)
```
    {
    	"name": "Lucas Fariasssss",
    	"email": "lucastest12@gmail.com",
    	"old_password": "123123",
    	"password": "123456",
    	"password_confirmation": "1234567"
    }
```
    - Exemplo de resposta
```
    {
      "id": "6849f750-98c8-4890-8e18-137f09739d0e",
      "name": "Lucas Farias",
      "email": "lucasnfarias01@gmail.com",
      "avatar": "078c32f68a2750a6b7fe-foto_perfil.jpg",
      "created_at": "2020-04-18T03:30:39.205Z",
      "updated_at": "2020-05-10T02:37:49.771Z"
    }
```
  - **POST /sessions/**
    - criar uma nova sessão]
    - Exemplo de corpo da requisição (JSON)
```
    {
    	"email": "lucastest@gmail.com",
    	"password": "123124"
    }
```
    - Exemplo de resposta
```
    {
      "user": {
        "id": "980be250-2ac6-4ee3-964-fba3a357de48",
        "name": "Lucas Farias",
        "email": "lucastest@gmail.com",
        "avatar": null,
        "created_at": "2020-06-27T22:56:06.685Z",
        "updated_at": "2020-06-27T22:56:06.685Z",
        "avatar_url": null
      },
      "token": "eyJhbGciOiJIUzI1NiIsInasdasdasIkpXVCJ9.eyJpYXQiOjE1OTM3MTQ5MjQsImV4cCI6MTU5MzgwMTMyNCwic3ViIjoiOTgwYmUyNTAtMmFjNi00ZWUzLTk5NjQtZmJhM2EzNTdkZTQ4In0.s2edUF4iPwcC6k5QYW6cwUiPwBdzQlMYy0iz4EekESw"
    }
```
  - **POST /users/**
    - criar um novo usuário
    - Exemplo de corpo da requisição (JSON)
```
    {
    	"name": "Lucas Farias",
    	"email": "lucastest@gmail.com",
    	"password": "123124"
    }
```

    - Exemplo de resposta
```
    {
        "id": "980be250-2ac6-4ee3-964-fba3a357de48",
        "name": "Lucas Farias",
        "email": "lucastest@gmail.com",
        "created_at": "2020-06-27T22:56:06.685Z",
        "updated_at": "2020-06-27T22:56:06.685Z",
        "avatar_url": null
    }
```
  - **PATCH /users/avatar**
    - atualizar foto de perfil do usuário
    - Exemplo de requisição (Multipart Form)
```
    propriedade avatar contentdo a sua imagem
```
