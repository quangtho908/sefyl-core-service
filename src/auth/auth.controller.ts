import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/user/user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post("register")
    async register(@Body() data: CreateUserDto) {
        return await this.authService.register(data);
    }

    @Post("login")
    async login(@Body() data: {email: string, password: string}) {
        return await this.authService.login(data);
    }
}