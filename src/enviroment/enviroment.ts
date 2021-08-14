export const enviroment = {
    app: {
        host: "localhost",
        port: 3000,
        domain: "http://localhost:3000"
    },
    mongo: {
        uri: "mongodb+srv://sefyl:23062002@cluster0.c0pmn.mongodb.net/sefyl?retryWrites=true&w=majority"
    },
    auth: {
        secret: "b9b89239a1eec0a9c5a98e43963cb93ce233579580ef59fa191bc82891c9e8e7",
        expried: "24h",
        salt: 20,
    }
}