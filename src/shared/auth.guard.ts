import { CanActivate, ExecutionContext, Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { IoredisService } from "src/ioredis/ioredis.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private ioredisService: IoredisService) {}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req: Request = context.switchToHttp().getRequest<Request>();
        req["user"] = { id: "6124e31d80801213e06d45e8" , role: "User",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjRlMzFkODA4MDEyMTNlMDZkNDVlOCIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNjMwMjA0MTE4LCJleHAiOjE2MzAyMDQ4Mzh9.1QU29JZ8frnxN-Q-BA6ULKa6m6bKnnVbJV0P3ohuFLs"}
        if(!req["user"]) throw new NotAcceptableException("user id is inavlid");
        const token: string = req.headers.authorization.split(" ")[1];
        const {refreshToken} = req["user"];
        const cacheToken: string = await this.ioredisService.getValue(refreshToken);
        if(token !== cacheToken) throw new UnauthorizedException();
        return true;
    }
}