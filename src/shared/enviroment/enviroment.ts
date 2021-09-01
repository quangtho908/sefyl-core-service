import { config } from "dotenv";
config();
export const env = {
    app: {
        host: process.env.HOST || "localhost",
        port: process.env.PORT || 3000 ,
        domain: process.env.DOMAIN || "http://localhost:3000"
    },
    collections: {
        users: process.env.COLLECTION_USERS,
        masterData: process.env.COLLECTION_MASTERDATA
    },
    mongo: {
        uri: process.env.DB_URI
    },
    auth: {
        secret: process.env.SECRET,
        expired: 24,
        salt: 10,
        secretRefresh: process.env.SECRET_REFRESH,
        expiredRefresh: 720,
    },
    uploads: {
        dirname: __dirname.split("\\").slice(0, -3).join("/"),
        avatars: process.env.AVATARS
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASS
    }
}