import { Injectable, NotAcceptableException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(data: {email: string, password: string}) {
        const checkEmail = await this.userService.getEmail(data.email);
        if(!!checkEmail) throw new NotAcceptableException(`${data.email} is not avaiable`);
        await this.userService.compareHash(data);

        const id = this.userService.getUserId(data.email);
        const access_token = await this.jwtService.sign({id, email: data.email});
        return {statusCode: 200, access_token};
    }

    async register(data: CreateUserDto) {
        const checkUsername = await this.userService.getUsername(data.username);
        const checkEmail = await this.userService.getEmail(data.email);
        
        if(!!checkUsername) throw new NotAcceptableException(`${data.username} is avaiable`);
        if(!!checkEmail) throw new NotAcceptableException(`${data.email} is avaiable`);
        return await this.userService.create(data);
    }
}