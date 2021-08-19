import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { genSaltSync, hashSync } from "bcrypt";
import { Model } from "mongoose";
import { enviroment } from "src/enviroment/enviroment";
import { BaseService } from "src/shared/base.service";
import { CreateUserDto, GetUserDto, ResModel, UpdateUserDto } from "./user.dto";
import { UserDocument } from "./user.schema";

@Injectable()
export class UserService extends BaseService<UserDocument>{
    constructor(
        @InjectModel("users") userModel: Model<UserDocument>,
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
        const hash: string = this.bcryptPassword(password);
        const newData = {name, email, username, hash};
        await this.create(newData);

        return {statusCode: 201, message: `Hey ${username} your account is created`};
    }

    async update(data: UpdateUserDto): Promise<ResModel> {
        await this.updateOne({username: data.username}, data);
        return {statusCode: 201, message: `Hey ${data.username} your account is updated`};
    }

    async delete(username: string): Promise<ResModel> {
        await this.deleteOne({username});
        return {statusCode: 200, message: `Hey ${username} your account is deleted`};
    }

    bcryptPassword(password: string): string {
        const salt: string = genSaltSync(enviroment.auth.salt);
        const hash: string = hashSync(password, salt);
        return hash;
    }
}