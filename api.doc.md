### POST /login

> authenticating

_Request Body_
```
{
  "email": "<email to get insert into>",
  "username": "<username to get insert into>"
  "password": "<password to get insert into>"
  "role": "<role to get insert into>"
}

```

_Response (200 - Created)_
```
{
  access_token : <access_token code>
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid Email or Password"
}
```

### POST /register

_Request Body_
```
{
  "email": "<email to get insert into>",
  "userame": "<userame to get insert into>"
  "password": "<password to get insert into>"
}

```

_Response (201 - Created)_
```
{
    "id": 5,
    "email": "a@mail.com",
    "role": "customer"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### POST /carts

> Create new carts

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "ProductId": 1,
  "UserId": 2,
  "quantity": 2,
  "status": "ready",
}

```

_Response (20i - Created)_
```
{
  "id": 2,
  "ProductId": 1,
  "UserId": 2,
  "quantity": 2,
  "status": "ready",
  "createdAt": "2021-04-14T13:38:04.010Z",
  "updatedAt": "2021-04-14T13:39:30.029Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### POST /products

> Create new products

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": <name input>,
  "image_url": <image_url input>,
  "price": <price input>,
  "stock": <stock input>,
}

```

_Response (201 - Created)_
```
{
  "data": {
      "id": 4,
      "name": "kaos kaki",
      "image_url": "doing",
      "price": 10000,
      "stock": 20,
      "updatedAt": "2021-04-14T14:08:50.670Z",
      "createdAt": "2021-04-14T14:08:50.670Z"
  }
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### GET /carts

> Get all carts
> customerAuthor

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "ProductId": 2,
    "UserId": 4,
    "quantity": 2,
    "status": "ready",
    "createdAt": "2021-04-14T13:18:09.137Z",
    "updatedAt": "2021-04-14T13:18:13.748Z",
    "Product": {
        "id": 2,
        "name": "tas sandang",
        "image_url": "doing",
        "price": 10000,
        "stock": 10,
        "createdAt": "2021-04-14T13:15:52.986Z",
        "updatedAt": "2021-04-14T13:15:52.986Z"
    }
},
{
    "id": 2,
    "ProductId": 1,
    "UserId": 2,
    "quantity": 2,
    "status": "ready",
    "createdAt": "2021-04-14T13:38:04.010Z",
    "updatedAt": "2021-04-14T13:39:30.029Z",
    "Product": {
        "id": 1,
        "name": "sepatu baru",
        "image_url": "doing",
        "price": 10000,
        "stock": 10,
        "createdAt": "2021-04-14T13:15:39.884Z",
        "updatedAt": "2021-04-14T13:15:39.884Z"
    }
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

### GET /products

> Get all products
> customerAuthor

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "name": "sepatu baru",
    "image_url": "doing",
    "price": 10000,
    "stock": 10,
    "createdAt": "2021-04-14T13:15:39.884Z",
    "updatedAt": "2021-04-14T13:15:39.884Z"
  },
  {
    "id": 2,
    "name": "tas sandang",
    "image_url": "doing",
    "price": 10000,
    "stock": 10,
    "createdAt": "2021-04-14T13:15:52.986Z",
    "updatedAt": "2021-04-14T13:15:52.986Z"
  },
  {
    "id": 3,
    "name": "baju kaos",
    "image_url": "doing",
    "price": 10000,
    "stock": 10,
    "createdAt": "2021-04-14T13:16:20.536Z",
    "updatedAt": "2021-04-14T13:16:20.536Z"
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

### Patch /carts/:id

> Get carts by id(find)
_Request Params_
```
id
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
"quantity": <carts quantity>,
"}
```

_Response (200)_
```
{
  "id": 3,
  "ProductId": 2,
  "UserId": 5,
  "quantity": 3,
  "status": "ready",
  "createdAt": "2021-04-14T13:52:46.002Z",
  "updatedAt": "2021-04-14T13:55:36.081Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---

_Response (404 - Not Found)_
```
{
  "message": "carts not found"
}
```
---

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```
---

### Delete /carts/:id

> Get carts by id(find)
_Request Params_
```
id
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  No needed,
"}
```

_Response (200)_
```
{
  message: "success deleted"
}
```

_Response (404 - Not Found)_
```
{
  "message": "carts not found"
}
```
---

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```
---

### Delete /products/:id

> Get products by id(find)
_Request Params_
```
id
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  No needed,
"}
```

_Response (200)_
```
{
  message: "success deleted"
}
```

_Response (404 - Not Found)_
```
{
  "message": "carts not found"
}
```
---

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```
---

### PUT /products/:id

> Put products by id(find)

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
id
```

_Request Body_
```
{
  "name": <name input>,
  "image_url": <image_url input>,
  "price": <price input>,
  "stock": <stock input>,
}
```

_Response (200)_
```
{
  "data": {
      "id": 4,
      "name": "kaos kaki",
      "image_url": "doing",
      "price": 10000,
      "stock": 20,
      "updatedAt": "2021-04-14T14:08:50.670Z",
      "createdAt": "2021-04-14T14:08:50.670Z"
  }
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---

_Response (404 - Not Found)_
```
{
  "message": "products not found"
}
```
---

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```
---