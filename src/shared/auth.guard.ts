import { CanActivate, ExecutionContext, Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { IoredisService } from "src/ioredis/ioredis.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private ioredisService: IoredisService) {}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req: Request = context.switchToHttp().getRequest<Request>();
        if(!req["user"]) throw new NotAcceptableException("user id is inavlid");
        const token: string = req.headers.authorization.split(" ")[1];
        const {refreshToken} = req["user"];
        const cacheToken: string = await this.ioredisService.getValue(refreshToken);
        if(token !== cacheToken) throw new UnauthorizedException();
        return true;
    }
}