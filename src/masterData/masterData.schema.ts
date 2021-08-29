import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type MasterDataDocument = MasterData & Document;

@Schema()
export class MasterData {
    @Prop()
    en: string

    @Prop()
    vi: string

    @Prop()
    jp: string
}

export const MasterDataSchema = SchemaFactory.createForClass(MasterData);