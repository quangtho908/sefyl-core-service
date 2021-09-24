import { Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { ResModel, ReqUserModel } from "src/shared/base.model";
import { auth} from "src/shared/enviroment/enviroment";
import { IoredisService } from "src/ioredis/ioredis.service";
import { CreateUserDto } from "src/user/user.dto";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./auth.dto";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private ioredisService: IoredisService
    ) {}

    async login(data: LoginDto): Promise<ResModel> {
        const {email, password} = data;
        const checkAvaiable = await this.userService.findOneAsync({email});
        if(!checkAvaiable) throw new NotAcceptableException(`${email} is not avaiable`);
        await this.userService.compareHash(checkAvaiable.hash, password);

        const user = {id: checkAvaiable._id, role: checkAvaiable.role}
        const {secret, expired, secretRefresh, expiredRefresh} = auth;

        const [access_token, refreshToken] = await Promise.all([
            sign(user, secret, {expiresIn: expired}),
            sign(user, secretRefresh, {expiresIn: expiredRefresh})
        ])

        Promise.all([
            this.ioredisService.setValue(checkAvaiable._id, refreshToken, expiredRefresh*3600),
            this.ioredisService.setValue(refreshToken, access_token, expired*3600)
        ])
        
        return {statusCode: 200, data: { access_token, refreshToken }, message: "Your account is logged"};
    }

    async register(data: CreateUserDto): Promise<ResModel> {
        const {username, email} = data;
        const [checkUsername, checkEmail] = await Promise.all([
            this.userService.findOneAsync({username}),
            this.userService.findOneAsync({email})
        ])
        
        if(!!checkUsername) throw new NotAcceptableException(`${data.username} is avaiable`);
        if(!!checkEmail) throw new NotAcceptableException(`${data.email} is avaiable`);
        return await this.userService.createUser(data);
    }

    async refreshToken(user: ReqUserModel): Promise<ResModel> {
        const {secret, expired} = auth;
        const {id, role, refreshToken} = user;
        const checkRefresh = await this.ioredisService.getValue(user.id);
        if(!checkRefresh) throw new UnauthorizedException("End of login session, please login to continue");
        const access_token: string = await sign({id, role}, secret, {expiresIn: expired});
        this.ioredisService.setValue(refreshToken, access_token, expired*3600);
        return {statusCode: 200, data: { access_token }, message: "New token"};
    }

    async logout(user: ReqUserModel): Promise<ResModel> {
        const { id, refreshToken } = user;
        await Promise.all([
            this.ioredisService.delValue(id),
            this.ioredisService.delValue(refreshToken)
        ])

        return {statusCode: 200, message: "Your is logged out"}
    }
}