import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "../user.service";

@Injectable()
export class CheckPass implements CanActivate {
    constructor(private userService: UserService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest<Request>();
        const hash: string = (await this.userService.findById(req["user"].id)).hash;
        await this.userService.compareHash(hash, req.body.password);
        return true;
    }

}