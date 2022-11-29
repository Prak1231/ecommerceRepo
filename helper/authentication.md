## Authentication Using Access and Refresh Token

### How to use

For creating tokens 

`npm i jsonwebtoken` <br>
`const auth = require('jsonwebtoken')` <br>

Inside payload for access token can keep userId or uniqueId and if anything else is necessary
Inside payload for refresh token only have to keep userId

```javascript
 let authResponse = {}
 let payload = {
    userId:user.userId,
 }
 let [accessToken, refreshToken] = await Promise.all([
    auth.generateAccessToken(payload),
    auth.generateRefreshToken(payload),
]);
    authResponse.accessToken = accessToken.accessToken;
    authResponse.expiresIn = Number(accessToken.expiresIn);
    authResponse.refreshToken = refreshToken.refreshToken;
    authResponse.refreshExpiresIn = Number(refreshToken.refreshExpiresIn);
    return authResponse
```

For validating tokens

use `process.env.JWT_SECRET_KEY`
```javascript
let verify = await auth.verifyAuthToken(jwtString,process.env.JWT_SECRET_KEY)
```

Use access token validator in a middleware and use in route.
Meanwhile refresh token will be used in a refresh token API, where if the output is success, you will get 
the userId or uniqueId stored in the refresh token and with that you can fetch the data from the database and
return the same login response as the API response.

Update your .env file  with the following parameters. `JWT_ACCESS_TOKEN_EXPIRY` and `JWT_REFRESH_TOKEN_EXPIRY` are in seconds
```
JWT_SECRET_KEY=
JWT_ACCESS_TOKEN_EXPIRY=
JWT_REFRESH_TOKEN_EXPIRY=
```

``
Note : Incase you want to blacklist a token (access or refresh), you can either use database (collection or table) or redis.
IMPORTANT : NEVER SAVE THE WHOLE TOKEN INSIDE YOUR DB OR REDIS, INSTEAD ADD A NEW UNIQUE ID PARAMETER AND KEEP THAT IN THE DB OR REDIS
``

```javascript
let payload = {
    userId:user.userId,
    time:new Date(),
    uniqueId: uuidv4()
}
```
``
Save the uniqueId and time left for the token expiry in the database while blacklisting.
Next time check if the token is valid using  using verifyAuthToken function.If its valid then check if the uniqueId
inside the JWT is present in DB or redis.
``