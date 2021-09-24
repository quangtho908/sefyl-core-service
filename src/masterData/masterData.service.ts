import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ResModel } from "src/shared/base.model";
import { BaseService } from "src/shared/base.service";
import { DataDto } from "./masterData.dto";
import { MasterData, MasterDataDocument } from "./masterData.schema";

@Injectable()
export class MasterDataService extends BaseService<MasterDataDocument>{
    constructor(
        @InjectModel(MasterData.name) model: Model<MasterDataDocument>
    ){ super(model); }

    async getData(lang: string, id: string): Promise<ResModel> {
        const data = await this.findByIdAsync(id);
        if(!data) throw new NotFoundException(`${id} is in valid`);
        return {statusCode: 200, data: data[lang], message: "Your data is found"};
    }

    async createData(data: DataDto): Promise<ResModel> {
        const id = (await this.create(data))._id;
        return {statusCode: 200, data: {id}, message: "Your data is created"};
    }

    async updateData(data: DataDto, id: string): Promise<ResModel> {
        await this.updateByIdAsync(id, data);
        return {statusCode: 201, message: "Your data is updated"}
    }

    async deleteData(id: string): Promise<ResModel> {
        await this.deleteByIdAsync(id);
        return {statusCode: 201, message: "Your data is deleted"}
    }
}