import { existsSync, mkdirSync, rmdirSync } from "fs";
import { diskStorage } from "multer";
import { env } from "src/shared/enviroment/enviroment";

export const storage = diskStorage({
    destination: function(req, file, cb) {
        const dest = `${env.uploads.dirname}${env.uploads.avatars}/${req["user"].id}`;
        if(existsSync(dest)) rmdirSync(dest, {recursive: true});
        mkdirSync(dest);
        cb(null, dest);
    },
    filename: function(req, file, cb) {
        const suffix: string = file.originalname.split(".").slice(-1)[0];
        const prefix: string = Math.random().toString(35).slice(2);
        const name: string = `${prefix}${Date.now()}` 
        cb(null, `${name}.${suffix}`)
    }
})
