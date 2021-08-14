import { Body, Delete, Get, Param, Put } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get()
    async getUser(@Param("username") username: string) {
        return await this.userService.getUser(username);
    }

    @Put()
    async update(@Body() data: UpdateUserDto) {
        return this.userService.update(data);
    }

    @Delete()
    async delete(@Body("username") username: string) {
        return this.userService.delete(username)
    }
}