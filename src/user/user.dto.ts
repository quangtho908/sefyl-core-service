import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    password: string

    datejoin?: string

}

export class UpdateUserDto {

    @IsString()
    name?: string

    @IsString()
    website?: string

    @IsString()
    location?: string

    @IsString()
    bio?: string;

    skill?: string[]

    @IsString()
    work?: string
    
    @IsString()
    education?: string

    @IsString()
    username?: string

    @IsString()
    avatar?: string
}

export class GetUserDto{
    @IsString()
    name?: string

    @IsString()
    email?: string

    @IsString()
    username: string
    
    datejoin?: Date

    @IsString()
    website?: string

    @IsString()
    location?: string

    @IsString()
    bio?: string

    @IsString()
    skills?: string[]

    @IsString()
    work?: string

    @IsString()
    education?: string
}

