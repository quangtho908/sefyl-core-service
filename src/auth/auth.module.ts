import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { enviroment } from "src/enviroment/enviroment";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: enviroment.auth.secret,
            signOptions: {
                expiresIn: enviroment.auth.expried
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService]
})
export class AuthModule {}