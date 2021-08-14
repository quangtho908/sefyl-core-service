import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";
import { BaseService } from "src/base.service";
import { CreateUserDto, GetUserDto, UpdateUserDto } from "./user.dto";
import { UserDocument } from "./user.schema";

@Injectable()
export class UserService extends BaseService{
    constructor(
        @InjectModel("users") userModel: Model<UserDocument>,
    ) { super(userModel) }

    async getUser(username: string): Promise<any> {
        const user: GetUserDto = await this.userModel.findOne({username},
            "name email useranme datejoin website location bio skills work education"
        )
        if(!user) throw new NotFoundException();
        return {statusCode: 200, user, message: `${username} is found`}
    }

    async create(data: CreateUserDto): Promise<any> {
        const {name, email, username, password, datejoin} = data;
        const hash = this.bcryptPassword(password);
        const newData = {name, email, username, hash, datejoin};
        await this.userModel.create(newData);

        return {statusCode: 201, message: `Hey ${username} your account is created`};
    }

    async update(data: UpdateUserDto): Promise<any> {
        await this.userModel.findOneAndUpdate({username: data.username}, data as UpdateWithAggregationPipeline | UpdateQuery<UserDocument>);
        return {statusCode: 201, message: `Hey ${data.username} your account is updated`};
    }

    async delete(username: string): Promise<any> {
        await this.userModel.findOneAndDelete({username});
        return {status: 200, message: `Hey ${username} your account is deleted`};
    }
}