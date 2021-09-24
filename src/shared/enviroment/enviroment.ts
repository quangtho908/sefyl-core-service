import { config } from "dotenv";
config();

export const application = {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 3000 ,
    domain: process.env.DOMAIN || "http://localhost:3000"
}

export const collections = {
    users: process.env.COLLECTION_USERS,
    masterData: process.env.COLLECTION_MASTERDATA
}

export const mongo = {
    uri: process.env.DB_URI
}
export const auth = {
    secret: process.env.SECRET,
    expired: 24,
    salt: 10,
    secretRefresh: process.env.SECRET_REFRESH,
    expiredRefresh: 720,
}

export const uploads = {
    dirname: __dirname.split("\\").slice(0, -3).join("/"),
    avatars: process.env.AVATARS
}

export const redis = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS
}
