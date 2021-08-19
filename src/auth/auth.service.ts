import { Injectable, NotAcceptableException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { CreateUserDto } from "src/user/user.dto";
import { UserDocument } from "src/user/user.schema";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(data: {email: string, password: string}) {
        const {email, password} = data;
        const checkAvaiable = await this.userService.findOne({email});
        if(!checkAvaiable) throw new NotAcceptableException(`${email} is not avaiable`);
        const payload = {hash: checkAvaiable.hash, password}
        await this.compareHash(payload);
        const access_token: string = await this.jwtService.sign({id: checkAvaiable._id, email: data.email});
        return {statusCode: 200, access_token};
    }

    async register(data: CreateUserDto) {
        const {username, email} = data;
        const checkUsername: UserDocument = await this.userService.findOne({username});
        const checkEmail: UserDocument = await this.userService.findOne({email});
        
        if(!checkUsername) throw new NotAcceptableException(`${data.username} is avaiable`);
        if(!checkEmail) throw new NotAcceptableException(`${data.email} is avaiable`);
        return await this.userService.createUser(data);
    }

    async compareHash(data: {hash: string ,password: string}): Promise<any> {
        const {hash, password} = data;
        const compare: boolean = compareSync(password, hash);
        if(!compare) throw new NotAcceptableException("Your password is incorrect")
        return;
    }
}