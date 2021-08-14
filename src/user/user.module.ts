import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { AuthModule } from "src/auth/auth.module";
import { CheckPassword } from "./middleware/checkPassword";

@Module({
    imports: [
        MongooseModule.forFeature([{name: "users", schema: UserSchema}]),
        AuthModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(CheckPassword)
        .forRoutes(
            {path: "user", method: RequestMethod.PUT},
            {path: "user", method: RequestMethod.DELETE}
        )  
    }
}