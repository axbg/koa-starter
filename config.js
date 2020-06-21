const dev = () => {
    return {
        DEV: true,
        PORT: 8080,
        DB_URI: 'mongodb://localhost:27017/your_db',
        ALLOW_CORS: true,
        GOOGLE_CLIENT_ID: "GOOGLE_CLIENT_ID",
        GOOGLE_SECRET: "GOOGLE_SECRET",
        FACEBOOK_CLIENT_ID: "FACEBOOK_CLIENT_ID",
        FACEBOOK_SECRET: "FACEBOOK_SECRET",
        COOKIE_KEYS: ['secret_keys', 'secret_keys'],
        ENABLE_SWAGGER: true,
        SESSION_CONFIG: {
            key: 'koa:sess',
            maxAge: 86400000,
            autoCommit: true,
            overwrite: true,
            httpOnly: false,
            signed: true,
            rolling: false,
            renew: true,
            secure: false,
            sameSite: null,
        }
    }
}

const prod = () => {
    return {
        DEV: false,
        PORT: 8000,
        DB_URI: 'mongodb://localhost:27017/your_db',
        ALLOW_CORS: true,
        GOOGLE_CLIENT_ID: "GOOGLE_CLIENT_ID",
        GOOGLE_SECRET: "GOOGLE_SECRET",
        FACEBOOK_CLIENT_ID: "FACEBOOK_CLIENT_ID",
        FACEBOOK_SECRET: "FACEBOOK_SECRET",
        COOKIE_KEYS: ['secret_keys', 'secret_keys'],
        ENABLE_SWAGGER: false,
        SESSION_CONFIG: {
            key: 'koa:sess',
            maxAge: 120000,
            autoCommit: true,
            overwrite: true,
            httpOnly: false,
            signed: true,
            rolling: false,
            renew: true,
            secure: true,
            sameSite: null,
        }
    }
}


module.exports = {
    ...(process.env.NODE_ENV === "production" ? prod() : dev())
}