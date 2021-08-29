import { Body, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { AuthGuard } from "src/shared/auth.guard";
import { ResModel, ReqUserModel } from "src/shared/base.model";
import { User } from "../shared/decorators/user";
import { UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get(":username")
    async getUser(@Param("username") username: string): Promise<ResModel> {
        return await this.userService.getUser(username);
    }

    @Post("avatar")
    @Roles(Role.Admin, Role.User)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor("avatar"))
    async createAvatar(@User() user: ReqUserModel, @UploadedFile() file: Express.Multer.File) {
        return this.userService.update(user.id, {avatar: `avatars/${user.id}/${file.filename}`});
    }

    @Put()
    @Roles(Role.Admin, Role.User)
    @UseGuards(AuthGuard, RolesGuard)
    async update(@User() user: ReqUserModel, @Body() data: UpdateUserDto): Promise<ResModel> {;
        return this.userService.update(user.id, data);
    }

    @Put("password")
    @Roles(Role.Admin, Role.User)
    @UseGuards(AuthGuard, RolesGuard)
    async updatePwd(@User() user: ReqUserModel, @Body() data): Promise<ResModel>{
        return this.userService.updatePwd(user.id, data.newPassword)
    }

    @Delete()
    @Roles(Role.Admin, Role.User)
    @UseGuards(AuthGuard, RolesGuard)
    async delete(@User() user: ReqUserModel): Promise<ResModel> {
        return this.userService.delete(user.id);
    }
}