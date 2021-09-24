import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { MulterModule } from "@nestjs/platform-express";
import { storage } from "./config_upload/upload.avatar";
import { collections } from "src/shared/enviroment/enviroment";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema, collection: collections.users}]),
        MulterModule.register({storage})
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule{}