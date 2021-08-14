import { Injectable, NestMiddleware, NotAcceptableException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../user.service";

@Injectable()
export class CheckPassword implements NestMiddleware{
    constructor(
        private jwtService: JwtService,
        private userService: UserService   
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        try{
            const password: string = req.body.password;
            const access_token: string = req.headers.access_token as string;
            const token: string = access_token.split(" ")[1];
            const { email } = this.jwtService.verify(token);
            await this.userService.compareHash({email, password});
            next();
        }catch {
            throw new NotAcceptableException("Token is invalid");
        }
        
    }

}