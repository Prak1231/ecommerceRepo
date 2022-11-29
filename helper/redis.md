## Authentication Using Redis

### Why Redis?

Drawbacks of using JWT is that there's no simple way to revoke a token if for example a user needs to be logged out or the token has been compromised. Revoking a token would mean to look it up in some storage and then deciding what to do next. Since one of the points of JWT is to avoid round trips to the db, a good compromise would be to store it in something less taxing than an RDBMS. That's a perfect job for Redis.

In our way still we can use jwt token !!!!!!

### How to use ?

### Installation
`npm i redis` <br>
`npm i jsonwebtoken` <br>
`npm i bluebird` <br>

Require redis,jsonwebtoken and bluebird in your file
a) jsonwebtoken is not mandatory (You can use any other token or create a token or string using any generator)
b) bluebird is used to convert callback to promise. Not mandatory you can use any npm(Promisify)

`const redis = require('redis');` <br>
`const bluebird = require('bluebird')` <br>
`const jwt = require('jsonwebtoken');` <br>


### Connect to Redis
```javascript
const client = redis.createClient({
host: process.env.REDIS_HOST,
port: process.env.REDIS_PORT,
});
```
 HOST and PORT to be mentioned <hostname> - The name of the host your database runs on
<port> - The port that the database is running on (default: 6379)

### Set the value with your generated key and your value with expiry time
   
   // Create key

```javascript
   const token = jwt.sign(PAYLOAD, process.env.JWT_ACCESS_TOKEN_EXPIRY);
```
   // PAYLOAD & SECRET_KEY can be random things you can put.

```javascript
  await client.setAsync(token, JSON.stringify(userData), 'EX', expiry);
```
  // Here "token" is the key  and "JSON.stringify(userData)" is the corresponding value, "EX" shows the mentioned time is expiry time and "expiry" is the time in seconds(s).

You can check whether token exist or not using 
```javascript
client.getAsync(token)
```
where token is the key and delete your token using 
```javascript
client.delAsync(token)
```
