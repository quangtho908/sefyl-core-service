import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    username: string

    @Prop()
    hash: string

    @Prop()
    datejoin: Date

    @Prop()
    website: string

    @Prop()
    location: string

    @Prop()
    bio: string

    @Prop({type: Array})
    skills: string[]

    @Prop()
    work: string

    @Prop()
    education: string
}

export const UserSchema = SchemaFactory.createForClass(User);