### Sign Up

Sign Up endpoint.

```plaintext
POST /api/v1/auth/signup
```

Supported attributes:

| attribute                | type     | location | required |
|--------------------------|----------|----------|----------|
| `firstname`              | string   | body     | yes      |
| `lastname`               | string   | body     | yes      |
| `email`                  | string   | body     | yes      |
| `password`               | string   | body     | yes      |

If successful, returns [`201`](rest/index.md#status-codes) and the following
response attributes:

| attribute                      | type     | nullabale |
|--------------------------------|----------|-----------|
| `success`                      | boolean  | no        |
| `data`                         | object   | no        |
| `data.user`                    | object   | no        |
| `data.user.id`                 | objectId | no        |
| `data.user.firstName`          | string   | no        |
| `data.user.lastName`           | string   | no        |
| `data.user.email`              | string   | no        |
| `data.user.avatar`             | object   | yes       |
| `data.user.avatar.size`        | object   | no        |
| `data.user.avatar.size.width`  | number   | no        |
| `data.user.avatar.size.height` | number   | no        |
| `data.user.avatar.path`        | string   | no        |
| `data.user.isSuperuser`        | boolean  | no        |
| `data.user.createdAt`          | date     | no        |
| `data.user.updatedAt`          | date     | no        |
| `data.token`                   | string   | no        |

Example request:

```shell
curl -X POST '<base_url>/api/v1/auth/signup' -H 'Content-Type:application/json' -d '{
	"firstName": "Islam",
	"lastName": "Hany",
	"email": "islam@gmail.com",
	"password": "secret12345"
}'
```

Example response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "65d1467bba5bc6d9ef1e71ec",
      "firstName": "Islam",
      "lastName": "Hany",
      "email": "islam@gmail.com",
      "avatar": null,
      "isSuperuser": false,
      "createdAt": "2024-02-17T23:51:23.155Z",
      "updatedAt": "2024-02-17T23:51:23.155Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzbGFtQGdtYWlsLmNvbSIsImlhdCI6MTcwODIxMzg4NCwiZXhwIjoxNzA5NTA5ODg0fQ.N7iCseNq0yxdChpm3G944k544z5kN9RxijwQrbrGDZg"
  }
}
```

### Sign In

Sign In endpoint.

```plaintext
POST /api/v1/auth/signin
```

Supported attributes:

| attribute                | type     | location | required |
|--------------------------|----------|----------|----------|
| `email`                  | string   | body     | yes      |
| `password`               | string   | body     | yes      |

If successful, returns [`200`](rest/index.md#status-codes) and the following
response attributes:

| attribute                      | type     | nullabale |
|--------------------------------|----------|-----------|
| `success`                      | boolean  | no        |
| `data`                         | object   | no        |
| `data.user`                    | object   | no        |
| `data.user.id`                 | objectId | no        |
| `data.user.firstName`          | string   | no        |
| `data.user.lastName`           | string   | no        |
| `data.user.email`              | string   | no        |
| `data.user.avatar`             | object   | yes       |
| `data.user.avatar.size`        | object   | no        |
| `data.user.avatar.size.width`  | number   | no        |
| `data.user.avatar.size.height` | number   | no        |
| `data.user.avatar.path`        | string   | no        |
| `data.user.isSuperuser`        | boolean  | no        |
| `data.user.createdAt`          | date     | no        |
| `data.user.updatedAt`          | date     | no        |
| `data.token`                   | string   | no        |

Example request:

```shell
curl -X POST '<base_url>/api/v1/auth/signin' -H 'Content-Type:application/json' -d '{
	"email": "islam@gmail.com",
	"password": "secret12345"
}'
```

Example response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "65d1467bba5bc6d9ef1e71ec",
      "firstName": "Islam",
      "lastName": "Hany",
      "email": "islam@gmail.com",
      "avatar": null,
      "isSuperuser": false,
      "createdAt": "2024-02-17T23:51:23.155Z",
      "updatedAt": "2024-02-17T23:51:23.155Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwODIzNTk1NCwiZXhwIjoxNzA5NTMxOTU0fQ.WHZY6lcqrQyjcARSzJwfmy_BBcEMEpqyPSNbsdcw9DU"
  }
}
```
