import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { compare, genSalt, hash } from "bcrypt";
import { Model } from "mongoose";
import { env } from "src/shared/enviroment/enviroment";
import { ResModel } from "src/shared/base.model";
import { BaseService } from "src/shared/base.service";
import { CreateUserDto, GetUserDto, UpdateUserDto } from "./user.dto";
import { User, UserDocument } from "./user.schema";
import { Role } from "src/role/role.enum";

@Injectable()
export class UserService extends BaseService<UserDocument>{
    constructor(
        @InjectModel(User.name) userModel: Model<UserDocument>,
    ) { super(userModel) }

    async getUser(username: string): Promise<ResModel> {
        const data: GetUserDto = await this.findOne({username});
        if(!data) throw new NotFoundException();
        const { name, email, datejoin, website, location, bio, skills, work, education } = data
        return {
            statusCode: 200, 
            data: { name, email, datejoin, website, location, bio, skills, work, education },
            message: `${username} is found`
        }
    }

    async createUser(data: CreateUserDto): Promise<ResModel> {
        const {name, email, username, password} = data;
        const hash: string = await this.bcryptPassword(password);
        const newData = {name, email, username, hash, role: Role.User};
        await this.create(newData);
        return {statusCode: 201, message: `Hey ${username} your account is created`};
    }

    async update(id: string, data: UpdateUserDto): Promise<ResModel> {
        await this.updateOneById(data, id);
        return {statusCode: 201, message: "Hey your account is updated"};
    }

    async updatePwd(id: string, newPassword: string) {
        const newHash: string = await this.bcryptPassword(newPassword);
        await this.updateOneById({hash: newHash}, id);
        return {statusCode: 2001, message: "Your password is updated"}
    }

    async delete(id: string,): Promise<ResModel> {
        await this.deleteOneById(id);
        return {statusCode: 200, message: "Hey your account is deleted"};
    }

    async bcryptPassword(password: string): Promise<string> {
        const salt: string = await genSalt(env.auth.salt);
        const newHash: string = await hash(password, salt);
        return newHash;
    }

    async compareHash(hash: string ,password: string): Promise<void> {
        const compHash: boolean = await compare(password, hash);
        if(!compHash) throw new NotAcceptableException("Your password is incorrect")
        return;
    }
}