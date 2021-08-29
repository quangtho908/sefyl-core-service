import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ResModel } from "src/shared/base.model";
import { BodyModel } from "./masterData.dto";
import { MasterDataService } from "./masterData.service";

@Controller("data")
export class MasterDataController {

    constructor(private masterDataService: MasterDataService){}
    @Get(":lang")
    async getData(@Param("lang") lang: string, @Body() body: {id: string}): Promise<ResModel> {
        return await this.masterDataService.getData(lang, body.id);
    }

    @Post()
    async createData(@Body() body: BodyModel): Promise<ResModel> {
        const {lang, data} = body;
        return await this.masterDataService.createData({[lang]: data});
    }

    @Put()
    async updateData(@Body() body: BodyModel): Promise<ResModel> {
        const {id, lang, data} = body;
        return await this.masterDataService.updateData({[lang]: data}, id);
    }

    @Put()
    async deleteData(@Body() body: BodyModel): Promise<ResModel> {
        return await this.masterDataService.deleteData(body.id);
    }
}