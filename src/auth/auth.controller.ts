import { Body, Controller, Post } from "@nestjs/common";
import { ResModel, ReqUserModel } from "src/shared/base.model";
import { User } from "src/shared/decorators/user";
import { CreateUserDto } from "src/user/user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post("register")
    async register(@Body() data: CreateUserDto): Promise<ResModel> {
        return await this.authService.register(data);
    }

    @Post("login")
    async login(@Body() data: {email: string, password: string}): Promise<ResModel> {
        return await this.authService.login(data);
    }

    @Post("refesh")
    async refresh(@User() user: ReqUserModel): Promise<ResModel> {
        return await this.authService.refreshToken(user);
    }

    @Post("logout")
    async logout(@User() user: ReqUserModel): Promise<ResModel> {
        return await this.authService.logout(user);
    }
}