import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { env } from "src/shared/enviroment/enviroment";
import { MasterDataController } from "./masterData.controller";
import { MasterData, MasterDataSchema } from "./masterData.schema";
import { MasterDataService } from "./masterData.service";
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: MasterData.name, schema: MasterDataSchema, collection: env.collections.masterData}
        ])],
    controllers: [MasterDataController],
    providers: [MasterDataService]
})
export class MasterDataModule {}