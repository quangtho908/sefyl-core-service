import { NotAcceptableException, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { UserDocument } from "./user/user.schema";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import {enviroment} from "./enviroment/enviroment";

export class BaseService {
    constructor(
        protected userModel?: Model<UserDocument>
    ) {}

    async getUserId(email: string): Promise<any> {
        const userId = await this.userModel.findOne({email}, "_id");
        if(!userId) throw new NotFoundException(`${email} is not found`);
        return userId._id;
    }

    async getUsername(username: string): Promise<any> {
        const check = await this.userModel.findOne({username}, "username");
        return check;
    }

    async getEmail(email: string): Promise<any> {
        const check = await this.userModel.findOne({email}, "email");
        return check;
    }

    bcryptPassword(password: string): string {
        const salt = genSaltSync(enviroment.auth.salt);
        const hash = hashSync(password, salt);
        return hash;
    }

    async compareHash(data: {email: string ,password: string}): Promise<any> {
        const {email, password} = data;
        const hash = (await this.userModel.findOne({email}, "hash")).hash;
        const compare = compareSync(password, hash);
        if(!compare) throw new NotAcceptableException("Your password is incorrect");
        return;
    }
}