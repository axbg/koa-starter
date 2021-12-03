# koa-starter

### A koa template ready to power up your future project (or mine 😁)
----
Features

- dotenv properties
- Database connection *(detected based on DB_URI env var value\*\*)*
  - MongoDB connection with Mongoose *(default)*
  - SQL connection with Sequelize *(preinstalled mysql2)*
- Passport integration
  - Username/Password
  - Google
  - Facebook
- Cookie-based JWT client sessions
- WebSockets enablement using Socket.IO
- In-file logs with 24h rotation
- Swagger UI
- ESLint

#
** *Mongoose and Sequelize have different interfaces, so, despite automatic database type configuration, 
[the ORM queries should still be written accordingly](./services/user.js)*
