export const env = {
    app: {
        host: "localhost",
        port: 3000,
        domain: "http://localhost:3000"
    },
    collections: {
        users: "users",
        masterData: "masterData"
    },
    mongo: {
        uri: "mongodb+srv://sefyl:23062002@cluster0.c0pmn.mongodb.net/sefyl?retryWrites=true&w=majority"
    },
    auth: {
        secret: "8303becf997551ee56ee93b4ba76f19c8960c3da51fef4bc05d76b50f40faebe",
        expired: 24,
        salt: 10,
        secretRefresh: "6d1bff57df6a938a16d644091c0acc4adb10108c79a225fa83af2d79c86be174",
        expiredRefresh: 720,
    },
    uploads: {
        dirname: __dirname.split("\\").slice(0, -3).join("/"),
        avatars: "/uploads/avatars" 
    },
    redis: {
        host: "redis-19989.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
        port: 19989,
        password: "K8UfPtYsxLi9MYWW0vZcH5QzdWTx3IPJ"
    }
}