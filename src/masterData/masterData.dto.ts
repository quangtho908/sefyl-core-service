import { IsString } from "class-validator";

export type Lang = "en" | "vi" | "jp"; 

export class DataDto {
    @IsString()
    en?: string

    @IsString()
    vi?: string

    @IsString()
    jp?: string
}

export type BodyModel = {
    id?: string,
    lang?: Lang,
    data?: string
}